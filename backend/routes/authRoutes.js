import express from "express";
import { login, signup } from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/login" , login );
router.post("/signup", signup)

export default router;