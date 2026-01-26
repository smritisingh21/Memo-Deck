import Folder from "../models/folderSchema.js";
import Note from "../models/notesSchema.js";
import User from "../models/UserSchema.js"

// Helper function to attach counts to folders
async function attachCountsToFolders(rawFolders) {
  return await Promise.all(
    rawFolders.map(async (f) => {
      const folderCount = await Folder.countDocuments({ parent: f._id });
      const noteCount = await Note.countDocuments({ parent: f._id });
      
      return {...f, itemsCount : folderCount + noteCount}
    })
  );
}

export async function getRoot(req, res) {
  try {
     const rawFolders = await Folder.find({ 
      parent: null,
      user: req.userId,
      archived: false
    }).lean();
    const notes = await Note.find({
      parent: null,
      user: req.userId,
      archived: false 
    });

    const folders = await attachCountsToFolders(rawFolders);

    res.status(200).json({ folders, notes });

  } catch (err) {
    console.error("Could not fetch root\n\n", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUser(req, res) {
  try {
    const userId = req.userId; 
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user data" });
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
    const rawFolders = await Folder.find({ 
      user: req.userId,
      archived: false,
      favourite: true,
    }).lean();
    
    const notes = await Note.find({
      user: req.userId,
      archived: false,
      favourite: true,
    }).lean();

    const folders = await attachCountsToFolders(rawFolders);
    res.status(200).json({ folders, notes });

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getArchived(req , res ) { 
    try{
  const rawFolders = await Folder.find({ 
      user: req.userId,
      archived: true,
    }).lean(); //lean() tells Mongoose to return plain JavaScript objects (POJOs) instead of full Mongoose Document objects when querying the database. 
    
    const notes = await Note.find({
      user: req.userId,
      archived: true,
    }).lean();

    const folders = await attachCountsToFolders(rawFolders);
    res.status(200).json({ folders, notes });

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}
