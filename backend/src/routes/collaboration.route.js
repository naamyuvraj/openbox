import express from "express";
import CollaborationController from "../controllers/collaboration.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Shared middleware
router.use(authenticateToken);

router.post("/cursor", CollaborationController.saveCursor.bind(CollaborationController));
router.get("/cursors/:fileId", CollaborationController.getActiveCursors.bind(CollaborationController));

export default router;
