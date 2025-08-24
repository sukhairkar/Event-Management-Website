// frontend/lib/withAuth.jsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Wrap a page component with role-based protection
 * @param {React.Component} Component - The page component
 * @param {Array<string>} allowedRoles - Roles that can access this page
 */
export function withAuth(Component, allowedRoles = []) {
  return function ProtectedPage(props) {
    const { isSignedIn, user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!isLoaded) return; // Wait until Clerk loads

      if (!isSignedIn) {
        router.push("/login"); // Not signed in → go to login
        return;
      }

      const role = user.publicMetadata?.role || "attendee";
      if (!allowedRoles.includes(role)) {
        // Redirect to role dashboard if user does not have access
        switch (role) {
          case "attendee":
            router.push("./app/attendee_dashboard");
            break;
          case "organiser":
            router.push("./app/organiser_dashboard");
            break;
          case "admin":
            router.push("./app/admin_dashboard");
            break;
          default:
            router.push("/login");
        }
      }
    }, [isLoaded, isSignedIn, user, router]);

    // While checking auth, show nothing or loader
    if (!isLoaded || !isSignedIn || !allowedRoles.includes(user?.publicMetadata?.role)) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
