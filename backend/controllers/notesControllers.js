import Note from "../models/notesSchema.js"

export async function getAllNotes( req , res ) {
    try{
        const notes = await Note.find().sort({createdAt : -1});//newestFirst
        res.status(200).json(notes);

    }catch(err){
        console.error("Could not fetch notes.\n\n" , err)
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getNote(req , res ) { 
    try{
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        res.status(200).json(note); 
        if(!note) return res.status(404).json({message : "Note not found."})

    }catch(err){
        console.error("Could not fetch note.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}

export async function createNote(req , res) {
    try{
        const {parentId} = req.params;
        const{ title, content} = req.body;
        const note = new Note({
             parent :parentId || null,
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
export async function editNote(req , res) {
    try{
        const noteId= req.params.id;
        const{title, content} = req.body;
        if (!title || !content) {
             return res.status(400).json({ message: "Title and content are required." });
        }

        const updatedNote = await Note.findByIdAndUpdate(
            noteId ,
            {title,content},
            { new:true}
        );
        if(!updatedNote) return res.status(404).json({message : "Note not found."})
        res.status(200).json(updatedNote); 
    }catch(err){
        console.error("Could not edit note.\n\n" , err);
        res.status(500).json({message : "Internal server error: " + err.message}) 
    }
}
export async function deleteNote(req , res) {
  try{
        const noteId= req.params.id;
        const deletedNote= await Note.findByIdAndDelete(noteId);
        if(!deletedNote) return res.status(404).json({message : "Note not found."})

        res.status(200).json({message :"note deleted successfully."});
    }catch(err){
        console.error("Could not create note.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}