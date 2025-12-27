import React from "react";
import { Link } from "react-router";
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon,PenSquareIcon } from 'lucide-react'
import axiosInstance from '../lib/axios';


export default function NoteCard({ note , id}) {
  const handleDelete = async (e, id) => {
    e.preventDefault(); 

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/note/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
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

        <h3 className="card-title text-actions text-neutral-content/80 text-sm mb-4 ">{note.title}</h3>

        <p className="text-accent/30 font-mono text-sm line-clamp-5">{note.content}</p>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/30">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center justify-end">

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
