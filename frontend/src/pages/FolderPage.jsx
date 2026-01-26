import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";
import PopUp from "../layouts/PopUp";
import CreateFolder from "./CreateFolder";
import FullScreenPopUp from "../layouts/FullScreenPopUp";
import CreateNote from "./CreateNote";
import { ArrowLeft, FolderClosed, HomeIcon, NotebookIcon } from "lucide-react";
import axiosInstance from "../lib/axios";
import { LoaderIcon } from "lucide-react";
import Search from "../components/Search";
import { FolderX } from "lucide-react";
import { FolderPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function FolderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [folder, setFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [onSeeMore, setOnSeeMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);


   useAuth();

  const allSearchableItems = [
    ...subfolders.map((f) => ({ ...f, type: "folder" })),
    ...notes.map((n) => ({ ...n, type: "note" })),
  ];

  async function fetchData() {
    setLoading(true);
    try {
      if (id) {
        const res = await axiosInstance.get(`/folder/${id}`);
        setFolder(res.data.folder);
        setSubfolders(res.data.subfolders);
        setNotes(res.data.notes);
      } else {
        const res = await axiosInstance.get("/root");
        setFolder(null);
        setSubfolders(res.data.folders);
        setNotes(res.data.notes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-start justify-center pt-20">
        <LoaderIcon className="animate-spin size-10 text-primary/60" />
      </div>
    );
  }

  const hasContent = subfolders?.length > 0 || notes?.length > 0;

  return (
    <div className="h-full md:p-10 sm:p-5 bg-transparent rounded-sm animate-in fade-in duration-150 ">
      <header className="flex justify-between items-center sm:p-6 sticky top-4 z-20 transition-all">
        <h1 className="text-2xl md:text-md flex gap-2 font-bold text-base/80">

        {folder ? (
            <div className="text-xs">
              <button
                className="flex justify-center items-center gap-3 hover:bg-secondary/10 rounded-xl p-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft />
              </button>
            </div>
          ) : (
            ""
          )}

        <div className="flex items-center justify-evenly gap-3">
           <div className="bg-primary/30 text-primary p-5 rounded-full">
           {folder?.title?  <FolderClosed size={30} /> :<HomeIcon size={30}  />}
         </div>
          <u>{folder ? folder.title : "Home"}</u>
        </div>
        </h1>

        <div className="flex gap-3 justify-center items-center">
          <Search items={allSearchableItems} className="bg-primary text-secondary" />

          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateFolder(true)}
          >
            <FolderPlus size={15} /> New Folder
          </button>

          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateNote(true)}
          >
            <NotebookIcon size={15} /> New Note
          </button>
        </div>
        
      </header>

      {subfolders.length > 0 && (
        
        <section className="animate-in fade-in duration-500 pt-10">
              <div className="flex items-center justify-center gap-4 mb-10 ml-5">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">
          Folders
        </h2>
        <div className="h-px flex-1 bg-base-content/5"></div>
      </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 min-h-full">
            {(onSeeMore ? subfolders : subfolders.slice(0, 4)).map((f) => (
              <FolderCard
                key={f._id}
                id={f._id}
                title={f.title}
                notes={f.notes || []}
                itemsCount={f.itemsCount}
                initialArchived={f.archived}
                isArchivePage={f.archived}
                initialFavourite={f.favourite}
                onDeleted={(id) => setSubfolders(prev => prev.filter(f => f._id !== id))}
                type="folder"
              />
            ))}
          </div>
          <div className="flex items-center justify-end px-4 mt-3 ">
            {subfolders.length > 4 && (
              <button
                className="text-xs font-bold text-secondary flex items-center gap-1 hover:gap-2 transition-transform translate-y-full duration-300 ease-in-out"
                onClick={() => setOnSeeMore(!onSeeMore)}
              >
                {onSeeMore ? "View Less" : `View All (${subfolders.length})`}
              </button>
            )}
          </div>
       
        </section>
      )}

     

      {notes.length > 0 && (
        <section>
        <div className="flex items-center justify-center gap-4 mb-10 ml-5 mt-20">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">
          Notes
        </h2>
        <div className="h-px flex-1 bg-base-content/5"></div>
      </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-9">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} id={note._id} type="note" />
            ))}
          </div>
        </section>
      )}

      {!hasContent && (
        <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
          <FolderX size={64} className="mb-6" />
          <h2 className="text-xl font-bold">Nothing yet</h2>
          <p className="text-sm max-w-xs mt-2">
            Start adding new notes and folders to see them here.
          </p>
        </div>
      )}

      {showCreateFolder && (
        <PopUp onClose={() => setShowCreateFolder(false)}>
          <CreateFolder
            parentId={id}
            onClose={() => setShowCreateFolder(false)}
            onCreated={() => fetchData()}
          />
        </PopUp>
      )}

      {showCreateNote && (
        <FullScreenPopUp onClose={() => setShowCreateNote(false)}>
          <CreateNote
            parentId={id}
            onClose={() => setShowCreateNote(false)}
            onCreated={() => fetchData()}
          />
        </FullScreenPopUp>
      )}
    </div>
  );
}

