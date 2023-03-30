import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import {addCommittee,getCommittes} from "../controllers/committee.js"

const router = express.Router();

router.post("/add-committee", addCommittee);
router.get("/get-committees", getCommittes);
export default router;