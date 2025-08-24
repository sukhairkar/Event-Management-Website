// backend/src/controller/clerkWebhook.js
import { supabase } from "../config/supabase.js";

export const clerkWebhook = async (req, res) => {
  try {
    // req.body is a raw buffer (express.raw used in route)
    const event = JSON.parse(req.body.toString());

    console.log("Received Clerk Event:", event.type);

    if (event.type === "user.created") {
      const { id: clerk_id, email_addresses, first_name, last_name } = event.data;

      // Grab the primary email
      const email = email_addresses?.[0]?.email_address || null;
      if (!email) {
        console.warn("No email found for Clerk user", clerk_id);
      }

      // Upsert into Supabase
      const { data, error } = await supabase.from("users").upsert([
        {
          clerk_id,                  // Clerk ID
          email,                     // User email
          full_name: `${first_name || ""} ${last_name || ""}`.trim(),
          role: "attendee",          // default role
          approved: false,           // default
        },
      ], { onConflict: ["clerk_id"] }); // use clerk_id for conflict handling

      if (error) {
        console.error("Supabase error:", error.message);
        return res.status(500).json({ error: "Supabase error", details: error.message });
      }

      console.log("Inserted/Updated user in Supabase:", data);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook handler failed:", err.message);
    return res.status(400).json({ error: "Webhook handler failed", details: err.message });
  }
};
