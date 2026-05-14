import express from "express";
import { analytics, deleteUser, manageBlogs, manageUsers } from "../controllers/adminController.js";
import { manageComments } from "../controllers/commentController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));
router.get("/analytics", analytics);
router.get("/users", manageUsers);
router.delete("/users/:id", deleteUser);
router.get("/blogs", manageBlogs);
router.get("/comments", manageComments);

export default router;
