import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon,PenSquareIcon } from 'lucide-react'
import axiosInstance from '../lib/axios';
import toast from "react-hot-toast";



export default function NoteCard({ note , id, type}) {

  const [notes , setNotes] = useState([]);

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

        <div className=" flex gap-7 justify-around items-center mt-4">

          <p className="text-sm text-base-content/30">
            {formatDate(new Date(note.createdAt))}
          </p>

          <div className="flex items-center justify-between">

            <PenSquareIcon className="size-4 btn-ghost" />

            <button
              className="btn btn-xs text-warning"
              onClick={(e) => handleDelete(e, id)}
            >
              <Trash2Icon className="size-4 btn-ghost" />
            </button>
          </div>

          
        </div>
      </div>
    </Link>
  );
}
