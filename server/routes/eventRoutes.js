import express from 'express';
import {getUnpublishedEvents, publishEvent, getPublishedEvents} from "../controllers/eventController.js"

const router = express.Router();

router.get("/getUnpublishedEvents", getUnpublishedEvents)
router.post("/publishEvent", publishEvent)
router.get("/getPublishedEvents", getPublishedEvents)


export default router;