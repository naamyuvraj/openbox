import express from "express";
import {
  commitChanges,
  getCommit,
  getAllCommits,
} from "../controllers/commit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Initial ZIP upload or manual changes → commit
router.post("/", upload.single("folder"), commitChanges);

// Get a single commit
router.get("/:id", getCommit);

// Get all commits of a repo
router.get("/repo/:repoId", getAllCommits);

export default router;
