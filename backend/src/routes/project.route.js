import express from "express";
import multer from "multer";
import extractAndUpload from "../controllers/file.controller.js";
import ProjectController from "../controllers/project.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Use auth middleware
router.use(protect);

// Routes
router.post("/upload", upload.single("projectZip"), extractAndUpload);
router.get("/", ProjectController.getUserProjects);
router.post("/", ProjectController.createProject);
router.get("/:id", ProjectController.getProjectDetails);
router.put("/:id/description", ProjectController.updateProjectDescription);
router.post("/:id/collaborator", ProjectController.addCollaborator);
router.delete("/:id", ProjectController.deleteProject);

export default router;
