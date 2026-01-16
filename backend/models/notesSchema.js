import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    type:{
      type:String,
      default:"Note",
    },

    favourite :{
    type:Boolean,
    default:false,
    },

    archived :{
    type:Boolean,
    default:false,
    
   },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
  },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;