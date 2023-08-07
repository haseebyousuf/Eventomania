import express from "express";
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
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/verify", verifyAdmin);
router.post("/createAdmin", createAdmin);
router.get("/convenors", checkRole(["admin"]), getConvenors);
router.post("/addConvenor", checkRole(["admin"]), addConvenor);
router.post("/deleteConvenor", checkRole(["admin"]), deleteConvenor);
router.get("/members", checkRole(["admin"]), getMembers);
router.post("/addMember", checkRole(["admin", "convenor"]), addMember);
router.post("/deleteMember", checkRole(["admin", "convenor"]), deleteMember);
router.post(
  "/changePassword",
  checkRole(["admin", "convenor", "member"]),
  changePassword
);
router.post(
  "/committeeMembers",
  checkRole(["member", "convenor"]),
  getCommitteeMembers
);

export default router;
