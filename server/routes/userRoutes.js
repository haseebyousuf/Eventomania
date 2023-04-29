import express from "express";
import { registerStudent } from "../controllers/userController.js";

const router = express.Router();
router.post("/registerStudent", registerStudent);


export default router;
