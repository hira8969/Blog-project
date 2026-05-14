import crypto from "crypto";
import User from "../models/User.js";
import { signToken } from "../utils/token.js";

const sendAuth = (res, user, status = 200) => {
  res.status(status).json({ token: signToken(user._id, user.role), user: user.toPublicJSON() });
};

export const register = async (req, res, next) => {
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      res.status(409);
      throw new Error("Email is already registered");
    }
    const user = await User.create(req.body);
    sendAuth(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user || !(await user.matchPassword(req.body.password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user.toPublicJSON() });
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ message: "If that email exists, a reset token has been generated." });
    const rawToken = crypto.randomBytes(24).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    res.json({ message: "Reset token generated.", resetToken: process.env.NODE_ENV === "production" ? undefined : rawToken });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const token = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      res.status(400);
      throw new Error("Reset token is invalid or expired");
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};
