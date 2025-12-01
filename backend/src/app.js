import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import profileRoutes from "./routes/Profile.route.js";
import fileRoutes from "./routes/file.route.js";
import commitRoutes from "./routes/commit.route.js";

import "./config/passport.js";

dotenv.config();

const app = express();
app.use(express.json());

// session for passport oauth
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// database connection
connectDB();

// logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/user", profileRoutes);
app.use("/api/files", fileRoutes); // mounted file routes
app.use("/api/commits", commitRoutes); // mounted commit routes

app.get("/ping", (req, res) => {
  res.send("pong");
});

// test endpoint
app.get("/", (req, res) => {
  res.send("Server chal rha hain!");
});

export default app;
