import { supabase } from "../../lib/supabaseClient.js";

export const createEvent = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { clerk_id, ...eventData } = req.body;

    // 1. Validate user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", clerk_id)
      .single();

    if (userError || !user) {
      console.error("❌ User lookup failed:", userError);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ Found user:", user);

    // 2. Filter allowed fields only
    const allowedFields = [
      "name",
      "description",
      "date_start",
      "date_end",
      "location",
      "is_virtual",
      "event_type",
      "ticket_stock",
      "price_from",
      "banner_url"
    ];

    const filteredEventData = Object.fromEntries(
      Object.entries(eventData).filter(([key]) => allowedFields.includes(key))
    );

    // 3. Insert event
    const { data, error } = await supabase
      .from("events")
      .insert([{ ...filteredEventData, created_by: user.id }])
      .select();

    if (error) {
      console.error("❌ Event insert failed:", error);
      return res.status(500).json({ error: "Event creation failed" });
    }

    res.status(201).json({ message: "Event created", data });
  } catch (err) {
    console.error("❌ Internal error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
