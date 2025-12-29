import { useState } from "react";
import axios from "../lib/axios";
import axiosInstance from "../lib/axios";

export default function EditBox({ id , oldTitle, onClose}) {
  console.log(id);

  const [title, setTitle] = useState({oldTitle});

   const handleEdit = async (e, id) =>{

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try{
      if(id){
      await axiosInstance.patch(`/folder/${id}`, { title })
     toast.success("Folder name changed !");

    };
    } catch (error) {
      console.log("Error in handleEdit", error);
      toast.error("Failed to edit !" , error);

    }}


  return (
    <div className="relative z-50 flex flex-col gap-4 mt-4 p-4 bg-base-200 rounded-lg border border-base-300"
    onClick={(e) =>{
        e.preventDefault();
        e.stopPropagation();
    }}>
      <h2 className="text-lg font-semibold mb-4 ">Edit Folder</h2>


      <input
        className="input input-bordered w-full mb-4"
        placeholder="New name"
        value={oldTitle}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') handleEdit();
            if (e.key === 'Escape') onClose();
          }}
        
      />

      <div className="flex justify-end gap-2">
        <button className="btn btn-glass"
        onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
        }}

         >
          Cancel
        </button>
        <button
          className="btn btn-primary"
           onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleEdit();
        }}
        >
          Save
        </button>
         <div className="mt-8 text-xs opacity-40 text-center max-w-xs">
        Press <strong>Enter</strong> to save, or <strong>Escape</strong> to cancel editing.
      </div>
      </div>
    </div>
  );
}
