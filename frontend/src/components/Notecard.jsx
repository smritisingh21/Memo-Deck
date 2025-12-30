import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon,PenSquareIcon } from 'lucide-react'
import { StarIcon } from "lucide-react";
import { Archive } from "lucide-react";
import axiosInstance from '../lib/axios';
import toast from "react-hot-toast";



export default function NoteCard({ note , id}) {

  const [notes , setNotes] = useState([]);
  const [favourite , setFavourite] = useState(false);
  const [ archived , setIsArchived] = useState(false);

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

  const AddToFav =async (id , favourite ,) =>{
    try{
      const res = await axiosInstance.patch(`/note/${id}` , {
       favourite,
      })
      if(favourite === true) toast.success("Note added to favourites");
      else toast.success("Note removed from favourites");
      
    }catch(err){
      console.log("error adding to favorites");
      toast.error("error adding to favorites")
    }
  }
  const ArchiveNote =async (id , archived) =>{
    try{
      await axiosInstance.patch(`/note/${id}` , {
       archived,
      } )
      toast.success("Added to archive");
    }catch(err){
      console.log("Could not archive");
      toast.error("Could not archive")
    }
  }
  

  const Tooltip = ({ children, content, position = "top" }) => {
  if (!content) return children;
  return (
    <div className={`tooltip z-20 tooltip-${position} before:text-[11px] before:font-bold`} data-tip={content}>
      {children}
    </div>
  );
};

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
          
          <Tooltip content="Delete">

           <button 
           className="flex items-center mb-4 justify-between gap-1  hover:text-red-600 hover:<Tool" 
           onClick={(e) => handleDelete(e, id)}>
            <div>
              <Trash2Icon size={16} className=" hover:text-red-600 " />
            </div>
              <p className="text-sm sm:hidden">Delete</p>
            </button>
            </Tooltip>
          



        {!archived ? (

            <Tooltip content="Archive">
          <button className="flex items-center mb-4 justify-between gap-1 hover:text-accent
             transition-all duration-300">

              <div className="flex justify-center items-center "
              onClick={(e) =>{
                e.stopPropagation()
                e.preventDefault();
                const val = !archived
                setIsArchived(!archived)
                ArchiveNote(id , val)

              }}>
                <Archive size ={16}/>
                <p className="md:text-sm sm:hidden">Archive</p>
              </div>
          </button>
            </Tooltip>
            ):(
              ""
            )   
          }
          <Tooltip content={`${favourite? "Remove from favourites" : "Add to favourites"}`}>
        
          <button 
              className="flex items-center mb-4 justify-between gap-1 hover:text-accent  hover:fill-accent" 
               onClick={(e) => {
              e.stopPropagation();
              e.preventDefault()
              const val = !favourite
              setFavourite(!favourite)
              AddToFav(id, val)
              window.location.reload();

            }}
            >
            <div >

            <StarIcon size={20} 
            className={`${favourite ? 'fill-accent text-transparent' :'fill-none'} hover:fill-accent   `}/>
            </div>
            <p className="text-sm sm:hidden">
              {!favourite ? "Add to favs" : "Remove from favs"}
            </p>
            </button>
            </Tooltip>

            </div>
      </div>
    </Link>
  );
}
