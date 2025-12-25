import Folder from "../models/folderSchema.js"

export async function getAllFolders( req , res ) {
    try{
        const folders = await Folder.find().sort({createdAt : -1});//newestFirst
        res.status(200).json(folders);

    }catch(err){
        console.error("Could not fetch folders.\n\n" , err)
        res.status(500).json({message : "Internal server error"})
    }
}


export async function getFolder(req , res ) { 
    try{
        const folderId= req.params.id;
        const folder = await Folder.findById(folderId);
        if(!folder) return res.status(404).json({message : "Folder not found."})
        res.status(200).json(folder);

    }catch(err){
        console.error("Could not fetch folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}

export async function createFolder(req , res) {
    try{
        const{ title, content } = req.body;
        const folder = new Folder({
             title : title, 
             content: content,
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
export async function editFolder(req , res) {
    try{
        const folderId= req.params.id;
        const{title, content} = req.body;
        if (!title || !content) {
             return res.status(400).json({ message: "Title and content are required." });
        }

        const updatedFolder = await Folder.findByIdAndUpdate(
            folderId ,
            {title,content},{
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
        const folderId= req.params.id;
        const deletedFolder= await Folder.findByIdAndDelete(folderId);
        if(!deletedFolder) return res.status(404).json({message : "Folder not found."})

        res.status(200).json({message :"folder deleted successfully."});
    }catch(err){
        console.error("Could not create folder.\n\n" , err);
        res.status(500).json({message : "Internal server error"})
    }
}