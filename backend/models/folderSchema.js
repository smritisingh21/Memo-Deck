import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
     type:{
      type:String,
      default:"Folder",
    },
  favourite :{
    type:Boolean,
    default:false,
  },
  archived :{
    type:Boolean,
    default:false,
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
    index:true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,  
  },

});

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
