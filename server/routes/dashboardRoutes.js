import express from 'express';
import {adminDashboardStats, committeeDashboardStats} from "../controllers/dashboardController.js"

const router = express.Router();


router.get("/adminDashboardStats",adminDashboardStats );
router.post("/committeeDashboardStats",committeeDashboardStats );


export default router;
