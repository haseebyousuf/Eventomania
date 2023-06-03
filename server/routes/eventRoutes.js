import express from 'express';
import {getUnApprovedEvents, deleteEvent, getEvents,togglePublish,approveEvent, getPublishedEvents, getApprovedEvents} from "../controllers/eventController.js"

const router = express.Router();

router.get("/getUnApprovedEvents", getUnApprovedEvents)
router.get("/getApprovedEvents", getApprovedEvents)
router.post("/approveEvent", approveEvent)
router.get("/getPublishedEvents", getPublishedEvents)
router.get("/getEvents", getEvents);
router.post("/togglePublish", togglePublish)
router.post("/deleteEvent", deleteEvent)
// router.get("/eventsPerMonth", eventsPerMonth)

export default router;