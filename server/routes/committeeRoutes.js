import express from "express";
import {
  addCommittee,
  getCommittees,
  deleteCommittee,
} from "../controllers/committeeController.js";
import { checkRole } from "../middleware/authMiddleware.js";
import { committeeValidationRules } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/addCommittee",
  checkRole(["admin"]),
  committeeValidationRules,
  addCommittee
);
router.get("/getCommittees", getCommittees);
router.post("/deleteCommittee", checkRole(["admin"]), deleteCommittee);

export default router;
