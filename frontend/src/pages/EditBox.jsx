import { useState } from "react";
import axios from "../lib/axios";
import axiosInstance from "../lib/axios";

export default function EditBox({ id , oldTitle, onClose}) {
  console.log(id);

  const [title, setTitle] = useState({oldTitle});

   const handleEdit = async (e, id) =>{
      e.preventDefault();
      e.stopPropagation();

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
    
      <div className=" absolute bottom-2 left-5 z-50 w-[calc(100%-1rem)] max-w-[400px] 
      flex flex-col justify-center gap-2 p-4 bg-base-100 rounded-2xl border-2 border-neutral/90 shadow-md shadow-neutral
      animate-in fade-in slide-in-from-bottom-2 duration-200"
    onClick={(e) =>{
        e.preventDefault();
        e.stopPropagation();
    }}>

      <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold mb-4 ">Edit Folder</h2>
      </div>


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

      <div className="flex justify-center gap-2">
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
    
      </div>
         <div className="mt-3 text-xs opacity-40 text-center max-w-xs">
        Press <strong>Enter</strong> to save, or <strong>Escape</strong> to cancel editing.
      </div>
    </div>
  );
}
