import express from "express";
import {
  commitChanges,
  getCommit,
  getAllCommits,
  getDiffBetweenVersions,
  commitSingleFile,
} from "../controllers/commit.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// fisrt zip upload 
router.post("/", upload.single("folder"), commitChanges);

router.get("/diff", getDiffBetweenVersions);
// Get a single comit
router.get("/:id", getCommit);

// et all commits of a repo
router.get("/repo/:repoId", getAllCommits);

router.post("/file/:fileId", commitSingleFile);

export default router;
