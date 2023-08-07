import express from "express";
import {
  adminDashboardStats,
  committeeDashboardStats,
} from "../controllers/dashboardController.js";
import { checkRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/adminDashboardStats", checkRole(["admin"]), adminDashboardStats);
router.post(
  "/committeeDashboardStats",
  checkRole(["convenor", "member"]),
  committeeDashboardStats
);

export default router;
