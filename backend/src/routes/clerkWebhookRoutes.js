// backend/src/routes/clerkWebhookRoutes.js
import express from "express";
import { Webhook } from "svix";
import dotenv from "dotenv";
import { supabase } from "../config/supabase.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

dotenv.config();
const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const payload = req.body;
    const headers = req.headers;

    // ✅ Verify Clerk webhook
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers);

    const eventType = evt.type;
    const user = evt.data;

    if (eventType === "user.created" || eventType === "user.updated") {
      const { id: clerk_id, email_addresses, first_name, last_name, public_metadata } = user;
      const email = email_addresses?.[0]?.email_address || null;

      let role = public_metadata?.role;

      // ✅ If role is missing (new user), assign default "attendee"
      if (!role) {
        role = "attendee";
        await clerkClient.users.updateUser(clerk_id, {
          publicMetadata: { role },
        });
        console.log(`🔄 Assigned default role=${role} to Clerk user ${clerk_id}`);
      }

      // ✅ Upsert user into Supabase
      const { data, error } = await supabase
        .from("users")
        .upsert(
          [
            {
              clerk_id,
              email,
              full_name: `${first_name || ""} ${last_name || ""}`.trim(),
              role,
            },
          ],
          { onConflict: ["clerk_id"] }
        );

      if (error) {
        console.error("❌ Supabase upsert error:", error.message);
        return res.status(500).json({ error: "Supabase sync failed", details: error.message });
      }

      console.log(`✅ Synced Clerk user ${clerk_id} → Supabase role=${role}`, data);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.status(400).json({ error: "Invalid webhook", details: err.message });
  }
});

export default router;
