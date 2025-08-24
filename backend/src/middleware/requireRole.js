// import { supabase } from "../config/supabase.js";

// export const requireRole = (roles) => {
//   return async (req, res, next) => {
//     try {
//       const { userId } = req.auth;

//       const { data, error } = await supabase
//         .from("users")
//         .select("role")
//         .eq("uuid", userId)
//         .single();

//       if (error || !data) {
//         return res.status(403).json({ message: "User not found" });
//       }

//       if (!roles.includes(data.role)) {
//         return res.status(403).json({ message: "Access denied" });
//       }

//       next();
//     } catch (err) {
//       res.status(500).json({ message: "Server error" });
//     }
//   };
// };

export const requireRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.auth?.sessionClaims?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
