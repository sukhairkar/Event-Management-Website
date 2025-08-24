//lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always load .env from backend root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = "https://jseuyzqomjjtkorrrugn.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzZXV5enFvbWpqdGtvcnJydWduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDU2Nzc4MiwiZXhwIjoyMDcwMTQzNzgyfQ.VwX79HkKYtLm3BzQiNwBxKMPgeztBbplE5pULHVpVj0";

if (!supabaseUrl) {
  throw new Error("❌ SUPABASE_URL is missing! Check your .env file.");
}
if (!supabaseServiceKey) {
  throw new Error("❌ SUPABASE_SERVICE_ROLE_KEY is missing! Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
