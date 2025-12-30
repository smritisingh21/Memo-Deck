import express from "express";
import { createNote, deleteNote, editNote, getAllNotes ,getNote} from "../controllers/notesControllers.js";

const router = express.Router();


router.get("/notes" , getAllNotes );
router.get("/note/:id" , getNote );

router.post("/note/:parentId" ,createNote );
router.delete("/note/:id" ,deleteNote );

router.patch("/note/:id" ,editNote );


export default router;