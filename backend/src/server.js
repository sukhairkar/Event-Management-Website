// server.js
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import clerkWebhookRoutes from "./routes/clerkWebhookRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminEventRoutes from "./routes/adminEventRoutes.js";
import organiserEventRoutes from "./routes/organiserEventRoutes.js"; // ✅
import announcementRoutes from "./routes/annoucementRoutes.js";
import job from "./config/cron.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(cors({ origin: "*" }));

// ✅ Clerk webhooks (raw body)
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  clerkWebhookRoutes
);

// ✅ Normal APIs (with JSON body parsing)
app.use("/api/users", express.json(), userRoutes);
app.use("/api/admin", express.json(), adminRoutes);
app.use("/api/admin", express.json(), adminEventRoutes);
app.use("/api/organiser", express.json(), organiserEventRoutes); // ✅ mount organiser routes
app.use("/api/announcements",express.json(), announcementRoutes);
app.use("/api/health", (req,res)=>{
    res.status(200).json({status:"ok"})
})

if (process.env.NODE_ENV === "production") job.start();

// Health check
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
