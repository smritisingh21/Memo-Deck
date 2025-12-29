import Folder from "../models/folderSchema.js"
import Note from "../models/notesSchema.js";

export async function getAllFolders( _, res ) {
    try{
        const folders = await Folder.find().sort({createdAt : -1});
        res.status(200).json(folders);

    }catch(err){
        console.error("Could not fetch folders.\n\n" , err)
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getFolder(req , res ) { 
    try{

        const {id} = req.params;
        const folder = await Folder.findById(id);

        if(!folder) return res.status(404).json({message : "Folder not found."})
        else{
            const subfolders = await Folder.find({ parent: id });
            const notes = await Note.find({ parent: id });
            return res.status(200).json({folder , subfolders ,notes});
        }

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}

export async function createFolder(req , res) {
    try{
        const {parentId} = req.params;
        const{ title} = req.body;

        const folder = new Folder({
            parent :parentId,
            title : title, 
            });
            
        const savedFolder = await folder.save();
        res.status(201).json(savedFolder);

    }catch(err){
        console.error("Could not create folder.\n\n" , err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Failed: " + err.message });
        }
        res.status(500).json({message : "Internal server error"})
    }

}
export async function createRootFolder(req, res) {
  try {
    const { title } = req.body;

    const folder = new Folder({
      title,
      parent: null,
    });

    const savedFolder = await folder.save();
    res.status(201).json(savedFolder);

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function editFolder(req , res) {
    try{
        const folderId = req.params.id;
        const{title} = req.body;

        if (!title ) {
             return res.status(400).json({ message: "Title cannot be empty" });
        }

        const updatedFolder = await Folder.findByIdAndUpdate(
            folderId ,
            {title},{
            new:true
        });
        if(!updatedFolder) return res.status(404).json({message : "Folder not found."})
        res.status(200).json({message:"updated"});
    }catch(err){
        console.error("Could not edit folder.\n\n" , err);
        res.status(500).json({message : "Internal server error: " + err.message}) 
    }
}
export async function deleteFolder(req , res) {
  try{
        const {id}= req.params;

        const deletedFolder= await Folder.findByIdAndDelete(id);
        if(!deletedFolder) return res.status(404).json({message : "Folder not found."})

        res.status(200).json({message :"folder deleted successfully."});
    }catch(err){
        console.error("Could not create folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}