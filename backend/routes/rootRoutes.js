import express from "express"
import { createNote, getRoot,getFavourites,getArchived } from "../controllers/rootController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/root" , getRoot)
router.post("/note" , createNote)
router.get("/favorites" , getFavourites );
router.get("/archive" , getArchived );


export default router;

