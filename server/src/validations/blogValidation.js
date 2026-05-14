import { body } from "express-validator";

export const blogRules = [
  body("title").trim().isLength({ min: 4, max: 160 }).withMessage("Title must be 4-160 characters"),
  body("excerpt").trim().isLength({ min: 12, max: 260 }).withMessage("Excerpt must be 12-260 characters"),
  body("content").trim().isLength({ min: 40 }).withMessage("Content must be at least 40 characters")
];
