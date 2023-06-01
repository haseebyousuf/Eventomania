import express from 'express';
import {adminDashboardStats, dashboardStatsByCommittee, eventsPerCommittee} from "../controllers/dashboardController.js"

const router = express.Router();


router.get("/adminDashboardStats",adminDashboardStats );
router.get("/dashboardStatsByCommittee",dashboardStatsByCommittee );
router.get("/eventsPerCommittee",eventsPerCommittee );


export default router;
