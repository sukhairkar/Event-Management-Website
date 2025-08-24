// backend/src/middleware/auth.js
import { clerkClient } from "@clerk/clerk-sdk-node";
import { supabase } from "../config/supabase.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing auth header" });

    const token = authHeader.replace("Bearer ", "");
    const session = await clerkClient.sessions.verifySession(token);
    const clerkId = session.userId;

    // look up in your users table
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_id", clerkId)
      .single();

    if (error || !user) return res.status(401).json({ error: "User not found" });

    req.user = user; // attach full user record
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};
