import app from "./app.js";
import dotenv from "dotenv";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

// ==================================
// KEEP-ALIVE CRON JOB (Runs every 10 minutes)
// ==================================
const RENDER_URL = process.env.API_BASE_URL || "https://openbox-0tuh.onrender.com";

cron.schedule("*/10 * * * *", async () => {
  console.log("⏱️ Cron Job Triggered: Pinging server to keep it alive...");
  try {
    await axios.get(`${RENDER_URL}/ping`);
    console.log("✅ Keep-alive ping successful.");
  } catch (error) {
    console.error("❌ Keep-alive ping failed:", error.message);
  }
});

// Remove old setInterval strategy in favor of the controlled cron
// ==================================
// Start Server


const PORT = process.env.PORT || 5170;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
