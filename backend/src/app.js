import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();
app.use(express.json());

connectDB(); 


app.use("/api/auth", authRoutes);



app.get("/", (req, res) => {
  res.send("Server chal rha hain!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

export default app;
