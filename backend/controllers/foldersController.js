import Folder from "../models/folderSchema.js"
import Note from "../models/notesSchema.js";

export async function getAllFolders(req, res) {
  try {

    const allFolders = await Folder.find({ 
      archived: false,
      user: req.userId
    });

    if (!allFolders.length) {
      return res.status(404).json({ message: "No folders found." });
    }

    const foldersWithCounts = await Promise.all(
    allFolders.map(async (f) => {
    const folderCount = await Folder.countDocuments({
      parent: f._id,
      user: req.userId
    });

    const noteCount = await Note.countDocuments({
      parent: f._id,
      user: req.userId
    });

    return {
      ...f.toObject(),        
      itemsCount: folderCount + noteCount
    };
  })
);

res.status(200).json(foldersWithCounts);


  } catch (err) {
    console.error("Could not fetch folders.\n", err);
    res.status(500).json({ message: "Internal server error" });
  }
}



export async function getFolder(req, res) {

  try {
    const { id } = req.params;
    const folder = await Folder.findOne({ _id: id });
    if (!folder) {
      return res.status(404).json({ message: "Folder not found." });
    }

    const rawSubfolders = await Folder.find({ 
      parent: id ,
      user: req.userId,
      archived:false
    });

    const notes = await Note.find({ 
      parent: id ,
      user: req.userId, 
      archived:false 
    });

    const subfolders = await Promise.all(
      rawSubfolders.map(async (f) => {
        const folderCount = await Folder.countDocuments({ parent: f._id });
        const noteCount = await Note.countDocuments({ parent: f._id });

        return {
          ...f.toObject(),
          itemsCount: folderCount + noteCount
        };
      })
    );

    return res.status(200).json({
      folder,
      subfolders,
      notes
    });

  } catch (err) {
    console.error("Could not fetch folder.\n\n", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function createFolder(req , res) {
    try{
        const {parentId} = req.params;
        const{ title} = req.body;

        const folder = new Folder({
            parent :parentId,
            title : title, 
            user: req.userId,
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
      user: req.userId, 
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
            new:true,
            user: req.userId, 
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
        const id= req.params.id;
        await Folder.findByIdAndDelete(id);
        if(!id) return res.status(404).json({message : "Folder not found."})

        res.status(200).json({message :"folder deleted successfully."});
    }catch(err){
        console.error("Could not delete folder.\n\n" );
        res.status(500).json({message : "Internal server error"})
    }
}