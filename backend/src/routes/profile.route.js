import express from "express";
import UserController from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// protect routes inside
router.use(protect);

// Get user profile
router.get("/", UserController.getProfile);

// Update user details
router.put("/", UserController.updateBioAvatar);

// Change user password
router.put("/password", UserController.changePassword);

export default router;
