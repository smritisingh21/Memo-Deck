import Folder from "../models/folderSchema.js";
import Note from "../models/notesSchema.js";

export async function getRoot(req, res) {

  const folders = await Folder.find({ parent: null });
  const notes = await Note.find({ parent: null });

  res.json({ folders, notes });
}
export async function createNote(req , res) {
    try{
        const{ title, content} = req.body;
        const note = new Note({
             parent : null,
             title : title, 
             content: content,
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