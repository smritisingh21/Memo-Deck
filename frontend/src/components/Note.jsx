import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon,PenSquareIcon } from 'lucide-react'
import axiosInstance from '../lib/axios';

export default function Note({note, setNotes}) {

 const handleDelete = async (e, id) => {
    e.preventDefault(); 

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/notes/${note._id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id)); // get rid of the deleted one
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  return (
    <Link
      to={`/note`}
      className=""
    >
      <div className=" card-body border-2 card-actions rounded-box bg-base-content/20 border-accent-content p-4 shadow-sm shadow-white">
        <h3 className="card-title text-actions text-content-secondary mb-4 ">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-6">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4 btn-ghost" />
            <button
              className="btn btn-xs text-warning"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 btn-ghost" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
