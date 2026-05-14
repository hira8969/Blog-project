import express from "express";
import { listNotifications, markRead } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listNotifications);
router.patch("/read", protect, markRead);

export default router;
