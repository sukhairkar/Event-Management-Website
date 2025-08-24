// app/api/users/by-clerk-id/[clerkId]/route.js
import { supabase } from "../../../../../lib/supabaseClient"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { clerkId } = params;

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_id", clerkId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ role: data.role });
}
