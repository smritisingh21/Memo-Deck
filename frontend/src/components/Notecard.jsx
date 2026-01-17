import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { formatDate } from '../../utils/helper.js';
import { Trash2Icon, PenSquareIcon } from 'lucide-react'
import { StarIcon } from "lucide-react";
import { Archive, ArchiveRestoreIcon } from "lucide-react";
import axiosInstance from '../lib/axios';
import toast from "react-hot-toast";

export default function NoteCard({ note, id }) {

  const [notes, setNotes] = useState([]);
  const [favourite, setFavourite] = useState(note.favourite || false);
  const [archived, setIsArchived] = useState(note.archived || false);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/note/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const AddToFav = async (id, favourite) => {
    try {
      await axiosInstance.patch(`/note/${id}`, { favourite });
      if (favourite === true) toast.success("Note added to favourites");
      else toast.success("Note removed from favourites");
    } catch {
      toast.error("error adding to favorites")
    }
  };

  const ArchiveNote = async (id, archived) => {
    try {
      await axiosInstance.patch(`/note/${id}`, { archived });
      toast.success("Added to archive");
    } catch {
      toast.error("Could not archive")
    } finally {
      window.location.reload();
    }
  };

  const Tooltip = ({ children, content, position = "top" }) => {
    if (!content) return children;
    return (
      <div className={`tooltip z-20 tooltip-${position} before:text-[11px] before:font-bold`} data-tip={content}>
        {children}
      </div>
    );
  };

  return (
    <Link to={`/note/${id}`} className="">
      <div className="relative bg-base-100 border-2 border-white/30 p-5 
      shadow-[4px_4px_0_0_theme(colors.white)] hover:shadow-[6px_6px_0_0_theme(colors.white)]
       hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all cursor-pointer">

        <h3 className="text-lg h-10 font-bold tracking-tight text-base-content border-b-2 border-white/40 pb-2 mb-2 overflow-y-clip">
          {note.title}
        </h3>

        <p className="text-sm text-base-content/70 font-mono line-clamp-5 mb-4">
          {note.content}
        </p>

        <div className="flex justify-between items-center text-xs font-semibold text-base-content/50 mb-4">
          {formatDate(new Date(note.createdAt))}
        </div>

        <div className="flex justify-center items-center gap-3 border-t-2 border-primary pt-3">

          <Tooltip content="Delete">
            <button
              className="flex items-center gap-1 border-2 border-secondary bg-base-100 px-2 py-1 shadow-[2px_2px_0_0_theme(colors.secondary)] hover:shadow-[3px_3px_0_0_theme(colors.secondary)] transition-all hover:text-red-600"
              onClick={(e) => handleDelete(e, id)}
            >
              <Trash2Icon size={16} />
              <p className="text-xs sm:hidden">Delete</p>
            </button>
          </Tooltip>

          {!archived ? (
            <Tooltip content="Archive">
              <button
                className="flex items-center gap-1 border-2 border-secondary bg-base-100 px-2 py-1 shadow-[2px_2px_0_0_theme(colors.secondary)] hover:shadow-[3px_3px_0_0_theme(colors.secondary)] transition-all hover:text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsArchived(true);
                  ArchiveNote(id, true);
                }}
              >
                <Archive size={16} />
                <p className="text-xs sm:hidden">Archive</p>
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Unarchive">
              <button
                className="flex items-center gap-1 border-2 border-secondary bg-base-100 px-2 py-1 shadow-[2px_2px_0_0_theme(colors.secondary)] hover:shadow-[3px_3px_0_0_theme(colors.secondary)] transition-all hover:text-accent"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsArchived(false);
                  ArchiveNote(id, false);
                }}
              >
                <ArchiveRestoreIcon size={16} />
                <p className="text-xs sm:hidden">Unarchive</p>
              </button>
            </Tooltip>
          )}

          <Tooltip content={`${favourite ? "Remove from favourites" : "Add to favourites"}`}>
            <button
              className="flex items-center gap-1 border-2 border-secondary bg-base-100 px-2 py-1 shadow-[2px_2px_0_0_theme(colors.secondary)] hover:shadow-[3px_3px_0_0_theme(colors.secondary)] transition-all hover:text-accent"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const val = !favourite;
                setFavourite(val);
                AddToFav(id, val);
              }}
            >
              <StarIcon size={18} className={`${favourite ? "fill-accent text-transparent" : "fill-none"} transition-all`} />
              <p className="text-xs sm:hidden">
                {!favourite ? "Fav" : "Unfav"}
              </p>
            </button>
          </Tooltip>

        </div>
      </div>
    </Link>
  );
}
