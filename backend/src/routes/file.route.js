import express from "express";
import {
  uploadFolder,
  getFile,
  getFileHistory,
} from "../controllers/file.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; // from above

const router = express.Router();

router.use(authenticateToken);

router.post("/upload", upload.single("folder"), uploadFolder);

// get file by itz id
router.get("/:id", getFile);

// Get history
router.get("/:id/history", getFileHistory);

export default router;
