// controllers/userController/getRole.js
import { supabase } from "../../lib/supabaseClient.js";

export const getRole = async (req, res) => {
  const { clerkId } = req.params;
  console.log("Fetching role for Clerk ID:", clerkId);

  try {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("clerk_id", clerkId)
      .single();

    if (error) {
      console.error("Supabase query failed:", error);
      return res.status(500).json({ error: "Failed to fetch role", details: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ role: data.role });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected server error", details: err.message });
  }
};
