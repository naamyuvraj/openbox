import express from "express";
import { inviteCollaborator ,getMyInvitations ,acceptInvitation ,rejectInvitation} from "../controllers/collaboration.controller.js";
import {authenticateToken} from "../middlewares/auth.middleware.js";

const router = express.Router();


router.post("/invite", authenticateToken, inviteCollaborator);
router.get("/my-invitations", authenticateToken, getMyInvitations);
router.patch("/:id/accept", authenticateToken, acceptInvitation);
router.patch("/:id/reject", authenticateToken, rejectInvitation);


export default router;
