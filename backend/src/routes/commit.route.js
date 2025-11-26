import express from "express";
import {
  commitChanges,
  getCommit,
  getAllCommits,
} from "../controllers/commit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Create a new commit (file changes)
router.post("/", commitChanges);

// Get a single commit by ID
router.get("/:id", getCommit);

// Get all commits of a repository
router.get("/repo/:repoId", getAllCommits);

export default router;
