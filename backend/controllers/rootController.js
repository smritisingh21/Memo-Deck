import Folder from "../models/folderSchema.js";
import Note from "../models/notesSchema.js";

export async function getRoot(req, res) {
  try {
    const rawFolders = await Folder.find({ 
        parent: null ,
        user: req.userId,
        archived : false
    });
    const notes = await Note.find({
         parent: null ,
         user: req.userId,
         archived :false 
        });

    const folders = await Promise.all(
      rawFolders.map(async (f) => {
        const folderCount = await Folder.countDocuments({ parent: f._id });
        const noteCount = await Note.countDocuments({ parent: f._id });

        return {
          ...f.toObject(),
          itemsCount: folderCount + noteCount
        };
      })
    );

    res.status(200).json({
      folders,
      notes
    });

  } catch (err) {
    console.error("Could not fetch root\n\n", err);
    res.status(500).json({ message: "Internal server error" });
  }
}



export async function createNote(req , res) {
    try{
        const{ title, content} = req.body;
        if(!content) return res.json({message :"No content to create note"})

        const note = new Note({
             parent : null,
             title : title || null, 
             content: content,
             user: req.userId,

            });
            
        const savedNote = await note.save();
        res.status(201).json(savedNote);

    }catch(err){
        console.error("Could not create note.\n\n" , err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation Failed: " + err.message });
        }
        res.status(500).json({message : "Internal server error"})
    }

}


export async function getFavourites(req , res ) { 
    try{

        const folders = await Folder.find({
            favourite: true, archived:false
        });
        const notes = await Note.find({
            favourite: true ,archived:false
        });

        if(!folders && !notes) return res.status(404).json({message : "Favourites not found."})

        else{
            return res.status(200).json({
             folders ,
             notes
            });
        }

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getArchived(req , res ) { 
    try{

        const folders = await Folder.find({
            archived: true
        });
        const notes = await Note.find({
            archived: true
        });

        if(!folders && !notes) return res.status(404).json({message : "Archived notes not found."})

        else{
            return res.status(200).json({
             folders,
             notes
            });
        }

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}
