import express from "express";
import { getProfile, toggleFollow, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/:id", getProfile);
router.patch("/me/profile", protect, upload.single("avatar"), updateProfile);
router.post("/:id/follow", protect, toggleFollow);

export default router;
