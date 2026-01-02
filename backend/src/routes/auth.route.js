import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Google login route
router.get("/google", AuthController.googleAuth);

// Callback after login
router.get("/google/callback", AuthController.googleCallback);

// Logout user route
router.get("/logout", AuthController.logout);

export default router;
