// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabaseClient.js";

// export default function RegisterCompletePage() {
//   const { isLoaded, isSignedIn, userId, user } = useAuth();
//   const router = useRouter();
//   const [status, setStatus] = useState("pending"); // pending, completed, error

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn || !userId || !user || status !== "pending") return;

//     (async () => {
//       try {
//         // Insert user into Supabase
//         const { data, error } = await supabase
//           .from("users")
//           .insert([
//             {
//               id: userId,
//               email: user.primaryEmailAddress?.emailAddress,
//               full_name: user.fullName || "",
//               role: "attendee", // default role
//               approved: false,
//             },
//           ])
//           .select();

//         if (error) {
//           console.error("Supabase insert error:", error);
//           setStatus("error");
//           return;
//         }

//         setStatus("completed");

//         // Redirect based on role
//         const role = data[0].role;
//         if (role === "admin") router.push("/dashboard/admin");
//         else if (role === "organiser") router.push("/dashboard/organiser");
//         else router.push("/dashboard/attendee");
//       } catch (err) {
//         console.error("Registration error:", err);
//         setStatus("error");
//       }
//     })();
//   }, [isLoaded, isSignedIn, userId, user, status, router]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {status === "pending" && <p>Completing registration...</p>}
//       {status === "completed" && <p>Registration completed! Redirecting...</p>}
//       {status === "error" && <p>There was an error registering. Try again.</p>}
//     </div>
//   );
// }
