// import supabase from "../../config/db.js";

// async function UserGet(req, res) {
//     const {email, password } = req.body;

//     if (!email || !password) {
//         res.send({message:"Please Enter email and Password."})
//     }

//     try {
//     const {data: users, error} = await supabase.from('users').select('*').eq("email",email)

//     const user = users[0];

//     if (users.length === 0) {
//         return res.status(401).json({ message: "User does not exist" });
//     }

//     return res.status(200).json({
//         message: "Login successful",
//         user: {
//         //  id: user.id,
//          full_name: user.full_name,
//          email: user.email,
//          role: user.role
//     }
//     })
    
//     } catch (error) {
//         res.status(401).json({
//             message:"Error Logging In : ",
//             error,
//         })
//     }
// }

// export default UserGet

// src/controller/userController/userGet.js
import { supabase } from "../../config/supabaseClient.js";

export const userGet = async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
