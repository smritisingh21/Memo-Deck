import { useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export default function CreateFolder({ parentId, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    try{
      if (!title.trim()) return;

    setLoading(true);
    if(parentId){
      await axios.post(`/folder/${parentId}`, {
      type: "folder",
      title,
      parent: parentId || null,
    });
    setLoading(false);
    onCreated(); // refresh folder
    onClose();

    }else{
        await axios.post(`/folder`, {
      title,
      parent: null,
    });
    setLoading(false);
    onCreated(); 
    onClose();
   }

   toast.success("Folder created successfully")
    }catch(err){
      console.log(err);
      toast.error("Could not create folder.")

    }
   
  }

  return (
    <div className="flex-col ">
      <h2 className="text-lg font-semibold mb-4 ">Create Folder</h2>
      <input
        className="input input-bordered w-full mb-4"
        placeholder="Folder name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' &&  handleCreate()}
        
      />

      <div className="flex justify-end gap-2">
        <button className="btn btn-glass" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={loading}
        >
          Create
        </button>
      </div>
    </div>
  );
}
