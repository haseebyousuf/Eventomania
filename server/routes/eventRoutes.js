import express from 'express';
import {getUnApprovedEvents, togglePublish,approveEvent, getPublishedEvents, getApprovedEvents} from "../controllers/eventController.js"

const router = express.Router();

router.get("/getUnApprovedEvents", getUnApprovedEvents)
router.get("/getApprovedEvents", getApprovedEvents)
router.post("/approveEvent", approveEvent)
router.get("/getPublishedEvents", getPublishedEvents)
router.post("/togglePublish", togglePublish)


export default router;