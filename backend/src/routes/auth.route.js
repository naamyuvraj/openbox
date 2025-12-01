import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

dotenv.config();
const router = express.Router();


// ==============================
// auth routes
// ==============================
router.post(
  "/register",
  (req, res, next) => {
    console.log("📩 Register route hit with body:", req.body);
    next();
  },
  register
);

router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  login
);

// ===============================
// oauth routes
// ===============================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], 
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  }
);

router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Access granted hain",
    user: req.user,
  });
});

export default router;
