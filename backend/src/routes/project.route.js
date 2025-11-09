import express from "express";
import {
    createProject,
    updateProject,
    deleteProject,
    getProject,
    getAllProjects,
    addCollaborator,
} from "../controllers/project.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken);

// project create kar
router.post("/",createProject);

// project update kar
router.put("/:id", updateProject);

// delete kar project 
router.delete("/:id", deleteProject);

// project lekar aa(get)
router.get("/:id", getProject);

// saara project laa
router.get("/", getAllProjects);

// add collaborator to project
router.post("/:id", addCollaborator);

export default router;
