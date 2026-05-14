import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authentication required");
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_super_secret_change_me");
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401);
      throw new Error("User no longer exists");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    res.status(403);
    return next(new Error("You do not have permission to perform this action"));
  }
  next();
};
