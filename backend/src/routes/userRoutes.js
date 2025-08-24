// backend/src/routes/userRoutes.js
import express from "express";
import { userRegisterSupabase } from "../controller/userController/userRegisterSupabase.js";
import { userDelete } from "../controller/userController/userDelete.js";
import { getRole } from "../controller/userController/getRole.js";
import { supabase } from "../lib/supabaseClient.js";

const router = express.Router();

// ✅ Register route
router.post("/register", userRegisterSupabase);

// ✅ Get role by Clerk ID
// router.get("/by-clerk-id/:clerkId", async (req, res) => {
//   try {
//     const { clerkId } = req.params;
//     console.log("Fetching role for Clerk ID:", clerkId);

//     // Ensure you're using Service Role key in supabaseClient.js
//     const { data, error } = await supabase
//       .from("users")       // 'users' table in public schema
//       .select("role,clerk_id")
//       .eq("clerk_id", clerkId)
//       .single();

//     console.log("Supabase data:", data);
//     console.log("Supabase error:", error);

//     if (error) {
//       console.error("Supabase query failed:", error);
//       return res.status(500).json({ error: "Failed to fetch role", details: error.message });
//     }

//     if (!data) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json({ role: data.role });
//   } catch (err) {
//     console.error("Error fetching user role:", err);
//     res.status(500).json({ error: "Failed to fetch role", details: err.message });
//   }
// });
router.get("/role/:clerkId",getRole);

// ✅ Delete user (legacy)
router.delete("/:userId", userDelete);

export default router;
