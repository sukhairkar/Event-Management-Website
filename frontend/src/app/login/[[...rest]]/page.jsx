// frontend/app/login/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";

export default function LoginPage() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Redirect based on role stored in Supabase / Clerk public metadata
      const role = user.publicMetadata?.role || "attendee";

      if (role === "attendee") router.push("/attendee_dashboard");
      if (role === "organiser") router.push("/organiser_dashboard");
      if (role === "admin") router.push("/admin_dashboard");
    }
  }, [isSignedIn, user, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/register"
        appearance={{ elements: { formButtonPrimary: "bg-blue-600" } }}
      />
    </div>
  );
}
