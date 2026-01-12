import express from "express";
import multer from "multer";

import ProjectController from "../controllers/project.controller.js";
import CommitController from "../controllers/commit.controller.js";
import FileController from "../controllers/file.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(authenticateToken);

// Create Project
router.post("/", ProjectController.createProject.bind(ProjectController));

// Upload ZIP -> Create Project + Initial Commit
router.post(
  "/upload",
  upload.single("projectZip"),
  authenticateToken,
  CommitController.commitChangesFromZip.bind(CommitController)
);

// Get User Projects
router.get("/", ProjectController.getUserProjects.bind(ProjectController));

// Get Single Project
router.get("/:id", ProjectController.getProjectDetails.bind(ProjectController));
router.get("/:id/details", ProjectController.getProjectDetails.bind(ProjectController));
router.patch("/:id/description", ProjectController.updateProjectDescription.bind(ProjectController));
router.delete("/:id", ProjectController.deleteProject.bind(ProjectController));

// File Actions inside Project route (kept for backwards compat)
router.get("/file/:fileId", FileController.getSingleFile.bind(FileController));
router.post("/file/:fileId/commit", FileController.commitFileChange.bind(FileController));

// Add Collaborator
router.post("/collaborators/:id", ProjectController.addCollaborator.bind(ProjectController));

export default router;
