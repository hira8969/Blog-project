import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Notification from "../models/Notification.js";

export const createComment = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.body.blog);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    const comment = await Comment.create({
      blog: blog._id,
      author: req.user._id,
      parent: req.body.parent || null,
      body: req.body.body
    });
    if (!blog.author.equals(req.user._id)) {
      await Notification.create({ user: blog.author, actor: req.user._id, blog: blog._id, type: "comment", message: `${req.user.name} commented on your blog.` });
    }
    res.status(201).json({ comment: await comment.populate("author", "name avatar") });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }
    if (!comment.author.equals(req.user._id) && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Only the author can update this comment");
    }
    comment.body = req.body.body;
    comment.edited = true;
    await comment.save();
    res.json({ comment: await comment.populate("author", "name avatar") });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }
    if (!comment.author.equals(req.user._id) && req.user.role !== "admin") {
      res.status(403);
      throw new Error("Only the author can delete this comment");
    }
    await Comment.deleteMany({ parent: comment._id });
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

export const toggleCommentLike = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }
    const liked = comment.likes.some((id) => id.equals(req.user._id));
    comment.likes = liked ? comment.likes.filter((id) => !id.equals(req.user._id)) : [...comment.likes, req.user._id];
    await comment.save();
    res.json({ liked: !liked, likes: comment.likes.length });
  } catch (error) {
    next(error);
  }
};

export const manageComments = async (req, res, next) => {
  try {
    const query = req.user.role === "admin" ? {} : { author: req.user._id };
    const comments = await Comment.find(query).populate("author", "name avatar").populate("blog", "title slug").sort({ createdAt: -1 });
    res.json({ comments });
  } catch (error) {
    next(error);
  }
};
