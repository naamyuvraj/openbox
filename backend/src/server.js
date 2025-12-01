import app from "./app.js";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

// ==================================
// CRON JOB (Runs every 12 minutes)
// ==================================
cron.schedule("*/12 * * * *", () => {
  console.log("⏱️ Cron Job Triggered: Every 12 minutes");

});

// ==================================
// Start Server
// ==================================

const PORT = process.env.PORT || 5170;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
