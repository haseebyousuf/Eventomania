import express from "express";
import { registerStudent,registerFaculty } from "../controllers/userController.js";

const router = express.Router();
router.post("/registerStudent", registerStudent);
router.post("/registerFaculty", registerFaculty);


export default router;
