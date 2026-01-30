import express from "express";
import UserController from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// authenticateToken routes inside
router.use(authenticateToken);

// Get user profile
router.get("/", UserController.getProfile);

// Get user recent activity
router.get("/activity", UserController.getActivity);

// Update user details
router.put("/", UserController.updateBioAvatar);

// Change user password
router.put("/password", UserController.changePassword);

export default router;
