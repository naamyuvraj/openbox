import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register, login } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

dotenv.config();
const router = express.Router();

/* -----------------------------
    AUTH (REGISTER + LOGIN)
----------------------------- */
router.post(
  "/register",
  (req, res, next) => {
    console.log("📩 Register route hit with body:", req.body);
    next();
  },
  register
);

router.post("/login", login);

/* -----------------------------
      GOOGLE OAUTH
----------------------------- */
// Step 1 — User clicks "Continue with Google"
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2 — Google redirects back
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://openbox-frontend.onrender.com/login",
  }),
  async (req, res) => {
    try {
      const user = req.user;

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // IMPORTANT: redirect to frontend with token
      return res.redirect(
        `https://openbox-frontend.onrender.com/oauth?token=${token}`
      );
    } catch (err) {
      console.error("OAuth error:", err);
      return res.redirect("https://openbox-frontend.onrender.com/login");
    }
  }
);

/* -----------------------------
        GET PROFILE
----------------------------- */
router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.user,
  });
});

export default router;
