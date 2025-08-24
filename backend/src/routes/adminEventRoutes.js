import express from "express";
import { supabase } from "../config/supabase.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

const router = express.Router();

// GET all pending events (admin dashboard)
router.get("/events/pending", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "pending");

    if (error) return res.status(500).json({ error: error.message });

    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Error fetching pending events:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST approve event
router.post("/events/approve", async (req, res) => {
  try {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ error: "Missing event_id" });

    const { data, error } = await supabase
      .from("events")
      .update({ status: "approved", updated_at: new Date() })
      .eq("id", event_id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ success: true, message: "Event approved successfully", data });
  } catch (err) {
    console.error("Error approving event:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST reject event (optional)
router.post("/events/reject", async (req, res) => {
  try {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ error: "Missing event_id" });

    const { data, error } = await supabase
      .from("events")
      .update({ status: "rejected", updated_at: new Date() })
      .eq("id", event_id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ success: true, message: "Event rejected successfully", data });
  } catch (err) {
    console.error("Error rejecting event:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
