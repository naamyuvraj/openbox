import express from "express";
import { getFileById, getFileHistory } from "../controllers/file.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Read-only operations
router.get("/:id", getFileById);
router.get("/:id/history", getFileHistory);

export default router;
