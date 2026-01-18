import express from "express"
import { createNote, getRoot,getFavourites,getArchived } from "../controllers/rootController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/root" ,protect, getRoot)
router.post("/note" ,protect, createNote)
router.get("/favorites" ,protect, getFavourites );
router.get("/archive" ,protect, getArchived );


export default router;

