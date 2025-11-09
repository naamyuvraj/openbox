import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

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

router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Access granted hain",
    user: req.user,
  });
});

export default router;
