import express from "express"
import { createNote, getRoot } from "../controllers/rootController.js";

const router = express.Router();

router.get("/root" , getRoot)
router.post("/note" , createNote)

export default router;

