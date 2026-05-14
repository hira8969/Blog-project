import express from "express";
import { body } from "express-validator";
import { createComment, deleteComment, manageComments, toggleCommentLike, updateComment } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/manage", protect, manageComments);
router.post("/", protect, body("body").trim().isLength({ min: 2, max: 1000 }), validate, createComment);
router.patch("/:id", protect, body("body").trim().isLength({ min: 2, max: 1000 }), validate, updateComment);
router.delete("/:id", protect, deleteComment);
router.post("/:id/like", protect, toggleCommentLike);

export default router;
