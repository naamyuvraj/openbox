import express from "express";
import {
  uploadFolder,
  getFile,
  getFileHistory,
} from "../controllers/file.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Upload a ZIP folder → creates initial commit automatically
router.post("/upload", upload.single("folder"), uploadFolder);

// Get a single file by ID (latest content)
router.get("/:id", getFile);

// Get the commit history of a file
router.get("/:id/history", getFileHistory);

export default router;
