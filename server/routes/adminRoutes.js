import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  createAdmin,
  getConvenors,
  verifyAdmin,
  addConvenor,
  getMembers,
  addMember,
  getCommitteeMembers,
  deleteConvenor,
  deleteMember,
  changePassword,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/verify", verifyAdmin);
router.post("/createAdmin", createAdmin);
router.get("/get-convenors", getConvenors);
router.post("/addConvenor", addConvenor);
router.post("/deleteConvenor", deleteConvenor);
router.get("/getMembers", getMembers);
router.post("/committeeMembers", getCommitteeMembers);
router.post("/addMember", addMember);
router.post("/deleteMember", deleteMember);
router.post("/changePassword", changePassword);

export default router;
