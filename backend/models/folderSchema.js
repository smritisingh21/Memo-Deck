import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true } 
);

const Folder = mongoose.model("Folder", folderSchema);

export default Folder;