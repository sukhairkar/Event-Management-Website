import { clerkClient } from "@clerk/clerk-sdk-node";
import { supabase } from "../../config/supabase.js";

/**
 * Get all users (Clerk + Supabase roles merged)
 */
export const getAllUsers = async (req, res) => {
  try {
    // 1. Fetch Clerk users (must use .data)
    const { data: clerkUsers } = await clerkClient.users.getUserList();

    // 2. Fetch Supabase users
    const { data: supabaseUsers, error } = await supabase
      .from("users")
      .select("clerk_id, role");
    if (error) throw error;

    // 3. Map Supabase roles by clerk_id
    const roleMap = Object.fromEntries(
      supabaseUsers.map((u) => [u.clerk_id, u.role])
    );

    // 4. Merge Clerk + Supabase roles
    const mapped = clerkUsers.map((u) => ({
      clerkId: u.id,
      email: u.emailAddresses[0]?.emailAddress,
      full_name: `${u.firstName || ""} ${u.lastName || ""}`.trim(),
      role: roleMap[u.id] || u.publicMetadata?.role || "attendee",
    }));

    res.status(200).json(mapped);
  } catch (error) {
    console.error("❌ Fetch users error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

/**
 * Update user role in both Clerk + Supabase
 */
export const updateUserRole = async (req, res) => {
  try {
    const { clerkId, role } = req.body;
    if (!clerkId || !role) {
      return res
        .status(400)
        .json({ error: "clerkId and role are required" });
    }

    // 1. Update Clerk metadata
    await clerkClient.users.updateUserMetadata(clerkId, {
      publicMetadata: { role },
    });

    // 2. Update Supabase users table
    const { data, error } = await supabase
      .from("users")
      .update({ role })
      .eq("clerk_id", clerkId);

    if (error) throw error;

    res.json({ message: "✅ Role updated successfully", data });
  } catch (err) {
    console.error("❌ Update role error:", err);
    res.status(500).json({ error: err.message });
  }
};
