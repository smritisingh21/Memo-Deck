import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Trash2Icon, FolderCheck } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../lib/axios";
import { PenBoxIcon } from "lucide-react";
import CreateFolder from "../pages/CreateFolder";
import EditBox from "../pages/EditBox";

export default function FolderCard({ id, title, notes =[] }) {

  const [folders, setFolders] = useState([])
  const [editBox, setEditBox] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault(); 
    e.stopPropagation()
    try {
      await axiosInstance.delete(`/folder/${id}`);
      setFolders((prev) => prev.filter((f) => f._id !== id));
      toast.success("Folder deleted successfully !");
      window.location.reload();

    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete !");

    }}
  
  return (
    <Link to={`/folder/${id}`}>

    <section className="bg-primary/10 rounded-md p-4 shadow-md  
    space-y-5 m-6 hover:shadow-md hover:shadow-primary-content/50 
    transition:bg-secondary/30 cursor-pointer">
        
        <div className="flex items-center justify-between">

          <div className="flex items-center justify-center gap-3 mb-4">

            <FolderCheck size={20} className="text-accent/80"/>
            <h2 className="text-md text-base-content font-semibold line-clamp-1">
              {title}
            </h2>

        </div>

      <div className="flex gap-4 justify-center items-center  ">
        <span className="text-sm text-base-content/80">
          {notes.length} items
       </span>

        <Trash2Icon size={18} className="text-gray-600 hover:text-red-600"
        onClick={ (e) => handleDelete(e ,id)}/>

        <button  className="text-gray-600 hover:text-base-content" 
        onClick={ (e) =>{
          e.preventDefault() ;
          e.stopPropagation();
          setEditBox(!editBox)}}>
          <PenBoxIcon size={18}/>
        </button>
      </div>

      </div>

    </section>

      {editBox &&  (
        <EditBox 
            id={id}
            oldTitle={title} 
            onClose={() => setEditBox(false)}
            onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            setEditBox(true)
          }}
            
          />
      )
      }
    </Link>
  );
}
