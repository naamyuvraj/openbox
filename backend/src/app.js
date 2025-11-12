import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import projectRoutes from "./routes/project.route.js";
import profileRoutes from "./routes/Profile.route.js";
import "./config/passport.js"

dotenv.config();

const app = express();
app.use(express.json());


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

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/user", profileRoutes);

app.get("/", (req, res) => {
  res.send("Server chal rha hain!");
});

export default app;
