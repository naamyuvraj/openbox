import express from "express";
import {
  commitChanges,
  getCommit,
  getAllCommits,
} from "../controllers/commit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// read commit by its id
router.get("/:id", getCommit);

// read all cmmmits
router.get("/repo/:repoId", getAllCommits);

// create new commit 
router.post("/", authenticateToken, commitChanges);

export default router;
