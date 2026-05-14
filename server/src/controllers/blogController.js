import Blog from "../models/Blog.js";
import Bookmark from "../models/Bookmark.js";
import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";
import { uploadBuffer } from "../services/uploadService.js";

const populateBlog = [
  { path: "author", select: "name avatar bio followers" },
  { path: "category", select: "name slug color icon" }
];

export const getBlogs = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Number(req.query.limit) || 9, 24);
    const skip = (page - 1) * limit;
    const filter = { status: "published" };
    if (req.query.category) filter.category = req.query.category;
    if (req.query.author) filter.author = req.query.author;
    if (req.query.q) filter.$text = { $search: req.query.q };
    const sortMap = {
      latest: { createdAt: -1 },
      trending: { views: -1, likes: -1 },
      popular: { likes: -1, bookmarks: -1 }
    };
    const sort = sortMap[req.query.sort] || sortMap.latest;
    const [blogs, total] = await Promise.all([
      Blog.find(filter).populate(populateBlog).sort(sort).skip(skip).limit(limit),
      Blog.countDocuments(filter)
    ]);
    res.json({ blogs, page, pages: Math.ceil(total / limit), total });
  } catch (error) {
    next(error);
  }
};

export const getTrendingBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ status: "published" }).populate(populateBlog).sort({ views: -1, likes: -1 }).limit(12);
    res.json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { views: 1 } },
      { new: true }
    ).populate(populateBlog);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    const comments = await Comment.find({ blog: blog._id }).populate("author", "name avatar").sort({ createdAt: 1 });
    res.json({ blog, comments });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    let coverImage;
    if (req.file) {
      const uploaded = await uploadBuffer(req.file.buffer, "lumina/blogs");
      if (uploaded.url) coverImage = uploaded;
    }
    const blog = await Blog.create({
      ...req.body,
      tags: parseTags(req.body.tags),
      author: req.user._id,
      coverImage: coverImage || (req.body.coverImage ? { url: req.body.coverImage } : undefined)
    });
    res.status(201).json({ blog: await blog.populate(populateBlog) });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    if (!blog.author.equals(req.user._id) && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Only the author can update this blog");
    }
    Object.assign(blog, req.body, { tags: parseTags(req.body.tags ?? blog.tags) });
    if (req.file) {
      const uploaded = await uploadBuffer(req.file.buffer, "lumina/blogs");
      if (uploaded.url) blog.coverImage = uploaded;
    }
    await blog.save();
    res.json({ blog: await blog.populate(populateBlog) });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    if (!blog.author.equals(req.user._id) && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Only the author can delete this blog");
    }
    await Promise.all([Comment.deleteMany({ blog: blog._id }), Bookmark.deleteMany({ blog: blog._id }), blog.deleteOne()]);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    const liked = blog.likes.some((id) => id.equals(req.user._id));
    blog.likes = liked ? blog.likes.filter((id) => !id.equals(req.user._id)) : [...blog.likes, req.user._id];
    await blog.save();
    if (!liked && !blog.author.equals(req.user._id)) {
      await Notification.create({ user: blog.author, actor: req.user._id, blog: blog._id, type: "like", message: `${req.user.name} liked your blog.` });
    }
    res.json({ liked: !liked, likes: blog.likes.length });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmark = async (req, res, next) => {
  try {
    const exists = await Bookmark.findOne({ user: req.user._id, blog: req.params.id });
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    if (exists) {
      await exists.deleteOne();
      blog.bookmarks = blog.bookmarks.filter((id) => !id.equals(req.user._id));
    } else {
      await Bookmark.create({ user: req.user._id, blog: blog._id });
      blog.bookmarks.push(req.user._id);
    }
    await blog.save();
    res.json({ bookmarked: !exists, bookmarks: blog.bookmarks.length });
  } catch (error) {
    next(error);
  }
};

export const myBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ author: req.user._id }).populate(populateBlog).sort({ updatedAt: -1 });
    res.json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const savedBlogs = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id }).populate({ path: "blog", populate: populateBlog }).sort({ createdAt: -1 });
    res.json({ blogs: bookmarks.map((item) => item.blog).filter(Boolean) });
  } catch (error) {
    next(error);
  }
};

const parseTags = (tags) => {
  if (Array.isArray(tags)) return tags;
  if (!tags) return [];
  return String(tags).split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean);
};
