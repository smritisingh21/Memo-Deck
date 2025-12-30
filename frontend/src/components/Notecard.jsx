import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon,PenSquareIcon } from 'lucide-react'
import { StarIcon } from "lucide-react";
import { Archive } from "lucide-react";
import axiosInstance from '../lib/axios';
import toast from "react-hot-toast";



export default function NoteCard({ note , id, type}) {

  const [notes , setNotes] = useState([]);
  const [favourite , setFavourite] = useState(false);
  const [isArchived , setIsArchived] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault(); 

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/note/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
      window.location.reload();

    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");

    }

  };

  const editNote =async (id) =>{
    try{
      await axiosInstance.patch(`/note/${id}` , {
        favourite : favourite,
        Archived: isArchived,
      } )
      toast.success("Succeed");
    }catch(err){
      console.log("error");
      toast.error("error")
    }
  }


  return (
      <Link
      to={`/note/${id}`}
      className=""
    >
      <div className=" card-body h-50 w-90 border border-b card-actions 
       overflow-hidden rounded-box align-center 
        bg-accent-content/20 border-accent-content p-4 
      shadow-md hover:shadow-xl  shadow-primary-content">

        <h3 className="card-title text-actions py-6  text-neutral-content/80 text-md mb-4 ">{note.title}</h3>

        <p className="text-accent/30 font-mono text-sm line-clamp-5">{note.content}</p>

        <div className=" flex gap-20 justify-evenly items-center mt-4">

          <div className="text-xs mb-4 text-base-content/40">
            {formatDate(new Date(note.createdAt))}
          </div>


        </div>

            <div className="flex justify-center items-center gap-6 opacity-60">


           <button 
           className="flex items-center mb-4 justify-between gap-1  hover:text-red-600 " 
           onClick={(e) => handleDelete(e, id)}>
            <div>
              <Trash2Icon size={13} className=" hover:text-red-600" />
            </div>
              <p className="text-sm">Delete</p>
            </button>


           <button 
           className="flex items-center mb-4 justify-between gap-1 hover:text-fuchsia-600  hover:fill-fuchsia-600" 
           onClick={(e) => {
              e.stopPropagation();
              e.preventDefault()
              setFavourite(!favourite)
              editNote(id)
            }}
            >
            <div >

            <StarIcon size={13} 
            className=" hover:fill-fuchsia-600" />
            </div>
            <p className="text-sm">
              {favourite ? "Add to favs" : "Remove from favs"}
            </p>
            </button>



            {!isArchived?  (
            <button className="flex items-center mb-4 justify-between gap-1 hover:text-accent
             transition-all duration-500">

              <div className="flex justify-center items-center "
              onClick={(e) =>{
                e.stopPropagation()
                e.preventDefault();
                setIsArchived(!isArchived)
                editNote(id)
              }}>
                <Archive size ={13}/>
                <p className="text-sm">Archive</p>
              </div>
            </button>
            ):
            (
              ""
            )
            }
            </div>
      </div>
    </Link>
  );
}
