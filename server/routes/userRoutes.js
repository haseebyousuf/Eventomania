import express from "express";
import {
  registerStudent,
  registerFaculty,
  getUsers,
} from "../controllers/userController.js";
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/registerStudent", registerStudent);
router.post("/registerFaculty", registerFaculty);
router.get("/getUsers", checkRole(["admin", "convenor", "member"]), getUsers);

export default router;
