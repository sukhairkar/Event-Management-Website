import express from "express";
import { updateUserRole, getAllUsers } from "../controller/userController/adminController.js";

const router = express.Router();

// GET all users
router.get("/users", getAllUsers);

// POST update role
router.post("/update-role", updateUserRole);

export default router;
