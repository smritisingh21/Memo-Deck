import express from "express";
import { createNote, deleteNote, editNote, getAllNotes ,getNote} from "../controllers/notesControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/notes" ,protect, getAllNotes );
router.get("/note/:id" , getNote );

router.post("/note/:parentId" ,protect,createNote );
router.delete("/note/:id" ,protect,deleteNote );

router.patch("/note/:id" ,protect,editNote );
export default router;