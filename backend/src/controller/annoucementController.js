// src/controller/annoucementController.js
import { supabase } from "../config/supabase.js";

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { event_id, organiser_id, title, message } = req.body;

    if (!event_id || !organiser_id || !title || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verify user is organiser
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", organiser_id)
      .single();

    if (userError || !user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "organiser") {
      return res.status(403).json({ error: "Only organisers can post announcements" });
    }

    // Insert into table
    const { data, error } = await supabase
      .from("event_announcements")
      .insert([{ event_id, organiser_id, title, message }])
      .select();

    if (error) throw error;
    return res.status(201).json({ message: "Announcement created", data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get all announcements for a specific event
export const getEventAnnouncements = async (req, res) => {
  try {
    const { eventId } = req.params;

    const { data, error } = await supabase
      .from("event_announcements")
      .select("id, title, message, created_at, organiser_id")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({ announcements: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
