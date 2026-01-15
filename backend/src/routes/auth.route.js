import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

// Google login
router.get("/google", AuthController.googleAuth.bind(AuthController));

// Google callback
router.get("/google/callback", AuthController.googleCallback.bind(AuthController));

// Simple logout
router.get("/logout", AuthController.logout.bind(AuthController));

// Token check
router.get("/verify", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.json({ authenticated: true, user: req.user });
  }
  return res.status(401).json({ authenticated: false });
});

export default router;
