// backend/src/controller/webhookController.js
import { supabase } from "../config/supabase.js";

export const handleClerkWebhook = async (req, res) => {
  try {
    const event = JSON.parse(req.body.toString());

    if (event.type === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;

      const { error } = await supabase.from("users").upsert([
        {
          id,
          email: email_addresses[0]?.email_address,
          full_name: `${first_name || ""} ${last_name || ""}`.trim(),
          role: "attendee",
          approved: false,
        },
      ]);

      if (error) throw error;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).json({ error: "Webhook handler failed" });
  }
};
