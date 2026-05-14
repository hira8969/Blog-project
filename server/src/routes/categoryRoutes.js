import express from "express";
import { createCategory, listCategories } from "../controllers/categoryController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listCategories);
router.post("/", protect, authorize("admin"), createCategory);

export default router;
