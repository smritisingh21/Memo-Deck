import express from "express";
import {Router} from "express";
import { createNote, deleteNote, editNote, getAllNotes ,getNote} from "../controllers/notesControllers.js";

const router = express.Router();


router.get("/notes" , getAllNotes );
router.get("/notes" , getNote );
router.post("/notes" ,createNote );
router.delete("/notes" ,deleteNote );
router.patch("/notes" ,editNote );


export default router;