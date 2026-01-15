import express from "express";
import FileController from "../controllers/file.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Read file info
router.get("/:id", FileController.getFileById.bind(FileController));
router.get("/:id/history", FileController.getFileHistory.bind(FileController));

export default router;
