import express from "express";
import { supabase } from "../lib/supabaseClient.js";
import { createEvent } from "../controller/organiserController/createEvent.js";

const router = express.Router();

// ✅ Create new event
router.post("/events", createEvent);

// ✅ Fetch all events (optional filter by organiserId)
router.get("/events", async (req, res) => {
  try {
    const { organiserId } = req.query;

    let query = supabase.from("events").select("*");
    if (organiserId) query = query.eq("created_by", organiserId);

    const { data, error } = await query;

    if (error) return res.status(400).json({ error: error.message });

    res.json(data || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch single event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return res.status(404).json({ error: "Event not found" });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update event by ID
router.put("/events/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const { data, error } = await supabase
      .from("events")
      .update(updatedFields)
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
