import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  getTrendingBlogs,
  myBlogs,
  savedBlogs,
  toggleBookmark,
  toggleLike,
  updateBlog
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { validate } from "../middleware/validate.js";
import { blogRules } from "../validations/blogValidation.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/trending", getTrendingBlogs);
router.get("/mine", protect, myBlogs);
router.get("/saved", protect, savedBlogs);
router.post("/", protect, upload.single("cover"), blogRules, validate, createBlog);
router.get("/:slug", getBlog);
router.patch("/:id", protect, upload.single("cover"), updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;
