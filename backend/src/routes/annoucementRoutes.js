import express from "express";
import { createAnnouncement, getEventAnnouncements } from "../controller/annoucementController.js";

const router = express.Router();

// POST: Organiser creates announcement
router.post("/", createAnnouncement);

// GET: Get all announcements for an event
router.get("/:eventId", getEventAnnouncements);

export default router;
