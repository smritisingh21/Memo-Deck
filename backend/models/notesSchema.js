import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    type:String,
    favourite : String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;