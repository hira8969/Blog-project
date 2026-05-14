import jwt from "jsonwebtoken";

export const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET || "dev_super_secret_change_me", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
