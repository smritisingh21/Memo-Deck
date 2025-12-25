import express from "express"
import { getRoot } from "../controllers/rootController.js";

const router = express.Router();

router.get("/root" , getRoot)

export default router;