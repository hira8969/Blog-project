import Blog from "../models/Blog.js";
import User from "../models/User.js";
import { uploadBuffer } from "../services/uploadService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const blogs = await Blog.find({ author: user._id, status: "published" }).sort({ createdAt: -1 }).limit(12);
    res.json({ user, blogs });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowed = ["name", "bio", "socials", "interests"];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) req.user[key] = req.body[key];
    });
    if (req.file) {
      const uploaded = await uploadBuffer(req.file.buffer, "lumina/avatars");
      if (uploaded.url) req.user.avatar = uploaded;
    }
    await req.user.save();
    res.json({ user: req.user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
};

export const toggleFollow = async (req, res, next) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) {
      res.status(404);
      throw new Error("User not found");
    }
    const following = req.user.following.some((id) => id.equals(target._id));
    req.user.following = following ? req.user.following.filter((id) => !id.equals(target._id)) : [...req.user.following, target._id];
    target.followers = following ? target.followers.filter((id) => !id.equals(req.user._id)) : [...target.followers, req.user._id];
    await Promise.all([req.user.save(), target.save()]);
    res.json({ following: !following, followers: target.followers.length });
  } catch (error) {
    next(error);
  }
};
