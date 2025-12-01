import express from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  addCollaborator,
} from "../controllers/project.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// Create a new project
router.post("/", createProject);

// Get all projects of logged-in user
router.get("/", getUserProjects);

// Get a single project by ID
router.get("/:id", getProjectById);

// Add a collaborator to a project
router.post("/collaborators/:id", addCollaborator);

export default router;
