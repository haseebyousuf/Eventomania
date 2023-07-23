import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addCommittee,
  getCommittees,
  deleteCommittee,
} from "../controllers/committeeController.js";

const router = express.Router();

router.post("/add-committee", addCommittee);
router.get("/get-committees", getCommittees);
router.post("/deleteCommittee", deleteCommittee);

export default router;
