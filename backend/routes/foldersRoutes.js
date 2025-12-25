import express from "express";
import { createRootFolder,createFolder, deleteFolder, editFolder, getAllFolders ,getFolder} from "../controllers/foldersController.js";

const router = express.Router();


router.get("/folders" , getAllFolders );
router.get("/folder/:id" , getFolder );

router.post("/folder", createRootFolder);
router.post("/folder/:parentId" , createFolder );

router.delete("/folder/:id" ,deleteFolder );
router.patch("/folder/:id" , editFolder );


export default router;