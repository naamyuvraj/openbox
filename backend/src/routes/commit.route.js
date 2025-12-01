import express from "express";
import {
  commitChanges,
  getCommit,
  getAllCommits,
  getCommitDiff,
} from "../controllers/commit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Initial zip upload 
router.post("/", upload.single("folder"), commitChanges);

// Get a single comit
router.get("/:id", getCommit);

// et all commits of a repo
router.get("/repo/:repoId", getAllCommits);

// get last diff
router.get("/:id/diff", getCommitDiff);


export default router;
