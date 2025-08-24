// import { supabase } from "../../config/supabaseClient.js";
// import bcrypt from "bcrypt";

// export const userRegister = async (req, res) => {
//   try {
//     const { full_name, email, password, role } = req.body;

//     if (!full_name || !email || !password) {
//       return res.status(400).json({ error: "Name, email, and password are required" });
//     }

//     // Check if user already exists
//     const { data: existingUser, error: findError } = await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();

//     if (findError && findError.code !== "PGRST116") {
//       // "PGRST116" means no rows found — ignore that error
//       throw findError;
//     }

//     if (existingUser) {
//       return res.status(409).json({ error: "User already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user
//     const { data, error } = await supabase
//       .from("users")
//       .insert([{ name, email, password: hashedPassword, role: role || "user" }])
//       .select();

//     if (error) throw error;

//     res.status(201).json({ message: "User registered successfully", user: data[0] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// src/controller/userController/userRegister.js
import { supabase } from "../../lib/supabaseClient.js"; // backend supabase client

export const userRegister = async (req, res) => {
  try {
    const { email , password , full_name, phone , role, organization , approved } = req.body;

    if (!password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password,
          full_name,
          phone, 
          role: role || "user",
          organization,
          approved: approved ?? false,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Clerk -> Supabase registration
export const userRegisterSupabase = async (req, res) => {
  try {
    const { userId, email, full_name, role } = req.body;

    // Insert user into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([{ id: userId, email, full_name, role, approved: false }])
      .select();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};