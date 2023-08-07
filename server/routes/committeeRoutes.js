import express from "express";
import {
  addCommittee,
  getCommittees,
  deleteCommittee,
} from "../controllers/committeeController.js";
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addCommittee", checkRole(["admin"]), addCommittee);
router.get("/getCommittees", checkRole(["admin"]), getCommittees);
router.post("/deleteCommittee", checkRole(["admin"]), deleteCommittee);

export default router;
