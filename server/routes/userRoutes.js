import express from "express";
import { registerStudent,registerFaculty, getUsers } from "../controllers/userController.js";

const router = express.Router();
router.post("/registerStudent", registerStudent);
router.post("/registerFaculty", registerFaculty);
router.get("/getUsers", getUsers);


export default router;
