import express from "express";
import { inviteCollaborator } from "../controllers/collaboration.controller.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create collaboration invite
router.post("/invite", authenticateToken, inviteCollaborator);

export default router;
