import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const analytics = async (req, res, next) => {
  try {
    const [users, blogs, comments, views, latestUsers] = await Promise.all([
      User.countDocuments(),
      Blog.countDocuments(),
      Comment.countDocuments(),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: "$views" } } }]),
      User.find().sort({ createdAt: -1 }).limit(5).select("-password")
    ]);
    res.json({ users, blogs, comments, views: views[0]?.total || 0, latestUsers });
  } catch (error) {
    next(error);
  }
};

export const manageUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const manageBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author", "name avatar").populate("category", "name").sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
