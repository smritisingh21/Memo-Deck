import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  type: String,
  favourite :Boolean,
  Archived :Boolean,
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null
  }

});

const Folder = mongoose.model("Folder", folderSchema);
export default Folder;
