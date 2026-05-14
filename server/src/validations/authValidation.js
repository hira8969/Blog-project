import { body } from "express-validator";

export const registerRules = [
  body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2-80 characters"),
  body("email").isEmail().normalizeEmail().withMessage("A valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

export const loginRules = [
  body("email").isEmail().normalizeEmail().withMessage("A valid email is required"),
  body("password").notEmpty().withMessage("Password is required")
];
