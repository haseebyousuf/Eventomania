import express from 'express';
import {verifyToken} from "../middleware/auth.js";
import {createAdmin, getConvenors, verifyAdmin, addConvenor} from "../controllers/admin.js"

const router = express.Router();

router.post("/verify", verifyAdmin)
router.post("/createAdmin", createAdmin);
router.get("/get-convenors", getConvenors); 
router.post("/addConvenor", addConvenor);
// router.get("/verifyToken", verifyToken)

export default router;