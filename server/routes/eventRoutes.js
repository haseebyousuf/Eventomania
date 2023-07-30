import express from "express";
import {
  getUnApprovedEvents,
  deleteEvent,
  getEvents,
  togglePublish,
  approveEvent,
  getPublishedEvents,
  getApprovedEvents,
  sendCertificate,
} from "../controllers/eventController.js";
const router = express.Router();

router.get("/unapprovedEvents", getUnApprovedEvents);
router.get("/approvedEvents", getApprovedEvents);
router.post("/approveEvent", approveEvent);
router.get("/publishedEvents", getPublishedEvents);
router.get("/getEvents", getEvents);
router.post("/togglePublish", togglePublish);
router.post("/deleteEvent", deleteEvent);
router.post("/sendCertificate", sendCertificate);
// router.get("/eventsPerMonth", eventsPerMonth)

export default router;
