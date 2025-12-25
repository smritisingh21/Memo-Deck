import Folder from "../models/folderSchema.js";
import Note from "../models/notesSchema.js";

export async function getRoot(req, res) {

  const folders = await Folder.find({ parent: null });
  const notes = await Note.find({ parent: null });

  res.json({ folders, notes });
}