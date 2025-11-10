// app.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";

dotenv.config();

const app = express();

app.use(express.json());

// Database connection
connectDB();
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/projects", projectRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server chal rha hain!");
});

export default app;
