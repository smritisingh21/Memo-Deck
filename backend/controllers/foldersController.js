import Folder from "../models/folderSchema.js"

export async function getAllFolders( req , res ) {
    try{
        const notes = await Folder.find().sort({createdAt : -1});//newestFirst
        console.log("Data from server:", notes);
        res.status(200).json(notes);

    }catch(err){
        console.error("Could not fetch notes.\n\n" , err)
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getFolder(req , res ) { 
    try{
        const noteId= req.params.id;
        const note = await Folder.findById(noteId);
        if(!note) return res.status(404).json({message : "Folder not found."})
        res.status(200).json({message : "Folder loaded"});

    }catch(err){
        console.error("Could not fetch note.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}

export async function createFolder(req , res) {
    try{
        const{ title, content } = req.body;
        const note = new Folder({
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
export async function editFolder(req , res) {
    try{
        const noteId= req.params.id;
        const{title, content} = req.body;
        if (!title || !content) {
             return res.status(400).json({ message: "Title and content are required." });
        }

        const updatedNote = await Folder.findByIdAndUpdate(
            noteId ,
            {title,content},{
            new:true
        });
        if(!updatedNote) return res.status(404).json({message : "Folder not found."})
        res.status(200).json({message:"updated"});
    }catch(err){
        console.error("Could not edit note.\n\n" , err);
        res.status(500).json({message : "Internal server error: " + err.message}) 
    }
}
export async function deleteFolder(req , res) {
  try{
        const noteId= req.params.id;
        const deletedNote= await Folder.findByIdAndDelete(noteId);
        if(!deletedNote) return res.status(404).json({message : "Folder not found."})

        res.status(200).json({message :"note deleted successfully."});
    }catch(err){
        console.error("Could not create note.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}