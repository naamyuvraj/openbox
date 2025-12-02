import express from "express";
import multer from "multer";
import { authenticateToken } from "../middlewares/auth.middleware.js";

import {
  createProject,
  getUserProjects,
  getProjectById,
  addCollaborator,
  getProjectDetails,
  updateProjectDescription,
} from "../controllers/project.controller.js";

import {
  commitChangesFromZip, // ← we will create this now
} from "../controllers/commit.controller.js";

const router = express.Router();

router.use(authenticateToken);

// Setup multer (memory storage for ZIP)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// -------------------------------
// CREATE PROJECT (normal)
// -------------------------------
router.post("/", createProject);

// -------------------------------
// UPLOAD ZIP → CREATE PROJECT + INITIAL COMMIT
// -------------------------------
router.post(
  "/upload",
  upload.single("projectZip"),
  authenticateToken,
  commitChangesFromZip
);

// -------------------------------
// GET USER PROJECTS
// -------------------------------
router.get("/", getUserProjects);

// -------------------------------
// GET SINGLE PROJECT
// -------------------------------
router.get("/:id", getProjectById);
router.get("/:id/details", authenticateToken, getProjectDetails);
router.patch("/:id/description", updateProjectDescription);

router.delete("/:id", deleteProject);


// -------------------------------
// ADD COLLABORATOR
// -------------------------------
router.post("/collaborators/:id", addCollaborator);

export default router;
