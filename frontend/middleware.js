// middleware.js
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "./lib/supabaseClient";

export default async function middleware(req) {
  const { userId } = auth();
  const url = req.nextUrl.clone();

  if (!userId) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
    
  }

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("clerk_id", userId)
    .single();

  if (error || !data) {
    console.error("❌ Role fetch error:", error);
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  const role = data.role;

  if (url.pathname.startsWith("/admin_dashboard") && role !== "admin") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/organiser_dashboard") && role !== "organiser") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/attendee_dashboard") && role !== "attendee") {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin_dashboard/:path*",
    "/organiser_dashboard/:path*",
    "/attendee_dashboard/:path*",
  ],
};
