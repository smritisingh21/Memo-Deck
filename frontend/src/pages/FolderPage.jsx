import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";
import PopUp from "../layouts/PopUp"
import CreateFolder from "./CreateFolder";
import FullScreenPopUp from "../layouts/FullScreenPopUp"
import CreateNote from "./CreateNote";
import { FolderClosed, NotebookIcon } from "lucide-react";
import axiosInstance from "../lib/axios";
import { LoaderIcon } from "lucide-react";
import Search from "../components/Search";
import { FolderPlus} from "lucide-react";



export default function FolderPage() {
  const { id } = useParams();

  const [folder, setFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [onSeeMore, setOnSeeMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);

  
    const allSearchableItems = [
    ...subfolders.map(f => ({ ...f, type: 'folder' })),
    ...notes.map(n => ({ ...n, type: 'note' }))
  ];


    async function fetchData() {
      setLoading(true);
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

      setLoading(false);
    }

  useEffect(() => {

    fetchData();
  }, [id]);

 if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-start justify-center ">
        <LoaderIcon className="animate-spin size-10 text-primary/60" />
      </div>
    );
  }

  return (
    <div className="p-10 space-y-4 shadow-lg ">

      {/* Header */}
      <header className="flex justify-between items-center p-6 
       border-x-blue-700 bottom-3 rounded-3xl border-primary">
        <h1 className="text-2xl md:text-md flex gap-2 font-bold text-base/80 ">

          <FolderClosed size={30}/><u>{folder ? folder.title : "Home" }</u>

        </h1>

        <div className="flex gap-3 justify-center items-center">
          <Search items={allSearchableItems} />

          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateFolder(true)}
          >
           <FolderPlus size={15}/> New Folder
          </button>

           <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateNote(true)}
            >
            <NotebookIcon size={15}/> New Note
          </button>
        </div>      

      </header>

       {subfolders.length > 0 && (
        <section className="">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {(onSeeMore ? subfolders : subfolders.slice(0, 6)).map((f) => (
              <FolderCard
                key={f._id}
                id={f._id}
                title={f.title}
                notes={f.notes || []}
                type="folder"
              />
            ))}
          </div>
             <div className="flex items-center justify-end px-4 mt-3">

            {subfolders.length > 6 && (
              <button 
                className="text-xs font-bold text-secondary flex items-center gap-1 hover:gap-2 transition-all"
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
          <h2 className="text-lg font-semibold mb-5"></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} id={note._id} type="note" />
            ))}
          </div>
        </section>
      )}

      {subfolders.length === 0 && notes.length === 0 && (
        <p className="text-base-content/60">
          This folder is empty
        </p>
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
