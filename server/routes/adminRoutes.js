import express from "express";
import {
  getConvenors,
  verifyAdmin,
  addConvenor,
  getMembers,
  addMember,
  getCommitteeMembers,
  deleteConvenor,
  deleteMember,
  changePassword,
  logout,
} from "../controllers/adminController.js";
import { checkRole } from "../middleware/authMiddleware.js";
import {
  changePasswordValidationRules,
  convenorValidationRules,
  memberValidationRules,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/verify", verifyAdmin);
router.post("/logout", logout);
router.get("/convenors", checkRole(["admin"]), getConvenors);
router.post(
  "/addConvenor",
  checkRole(["admin"]),
  convenorValidationRules,
  addConvenor
);
router.post("/deleteConvenor", checkRole(["admin"]), deleteConvenor);
router.get("/members", checkRole(["admin"]), getMembers);
router.post(
  "/addMember",
  checkRole(["admin", "convenor"]),
  memberValidationRules,
  addMember
);
router.post("/deleteMember", checkRole(["admin", "convenor"]), deleteMember);
router.post(
  "/changePassword",
  checkRole(["admin", "convenor", "member"]),
  changePasswordValidationRules,
  changePassword
);
router.post(
  "/committeeMembers",
  checkRole(["member", "convenor"]),
  getCommitteeMembers
);

export default router;
