import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import profileRoutes from "./routes/profile.route.js";
import fileRoutes from "./routes/file.route.js";
import commitRoutes from "./routes/commit.route.js";

import "./config/passport.js";

dotenv.config();

const app = express();

// =====================
// CORS 
// =====================
app.use(
  cors({
    origin: ["http://localhost:3000" , "https://openbox-dashboard.vercel.app/" ,"http://localhost:5170" ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

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

// DB
connectDB();

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// =====================
// Routes 
// =====================
app.use("/api/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/user", profileRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/commits", commitRoutes);

app.get("/ping", (req, res) => res.send("pong"));

app.get("/", (req, res) => {
  res.send("Server chal rha hain!");
});

export default app;
