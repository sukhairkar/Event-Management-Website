import express from "express"
import CreateEvent from "../controller/eventController/eventCreate.js";
import GetAllUserEvents from "../controller/eventController/GetAllUserEvents.js";
import GetOneUserEvent from "../controller/eventController/GetOneUserEvent.js";
import DeleteAllUserEvents from "../controller/eventController/(U)DeleteAllUserEvents.js";

const router = express.Router();

router.post("/create/:userId", CreateEvent);

router.get("/getAll/:userId", GetAllUserEvents);

router.get("/getOne/:userId/:eventId", GetOneUserEvent);

router.delete("/deleteAll/:userId", DeleteAllUserEvents);

export default router

