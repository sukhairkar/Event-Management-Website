// app/register/[[...rest]]/page.jsx
"use client";

import { SignIn, SignUp, RedirectToSignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RegisterCatchAll() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) return;

    const fetchRole = async () => {
      try {
        const res = await fetch(`/api/users/by-clerk-id/${user.id}`);
        const { role } = await res.json();

        if (role === "organiser") router.push("/organiser_dashboard");
        else if (role === "organiser") router.push("/organiser_dashboard");
        else router.push("/attendee_dashboard");

      } catch (err) {
        console.error("Failed to fetch role", err);
      }
    };

    fetchRole();
  }, [isLoaded, isSignedIn, user, router]);

  // Show Clerk UI depending on path
  if (pathname.includes("sign-up")) {
    return <SignUp path="/register/sign-up" routing="path" />;
  }

  if (pathname.includes("sign-in")) {
    return <SignIn path="/register/sign-in" routing="path" />;
  }

  // If user is not signed in and no /sign-in in URL → redirect
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <p>Redirecting based on role...</p>;
}
