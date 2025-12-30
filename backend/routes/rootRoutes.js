import express from "express"
import { createNote, getRoot,getFavourites } from "../controllers/rootController.js";

const router = express.Router();

router.get("/root" , getRoot)
router.post("/note" , createNote)
router.get("/favorites" , getFavourites );


export default router;

