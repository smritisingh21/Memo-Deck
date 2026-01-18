import express from "express";
import { createRootFolder,createFolder, deleteFolder, editFolder, getAllFolders ,getFolder} from "../controllers/foldersController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/folders" ,protect, getAllFolders );
router.get("/folder/:id" ,protect,getFolder );

router.post("/folder",protect, createRootFolder);
router.post("/folder/:parentId" ,protect, createFolder );

router.delete("/folder/:id" ,protect,deleteFolder );
router.patch("/folder/:id" ,protect, editFolder );


export default router;