import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";
import PopUp from "../layouts/PopUp"
import CreateFolder from "./CreateFolder";
import FullScreenPopUp from "../layouts/FullScreenPopUp"
import CreateNote from "./CreateNote";
import { FolderClosed } from "lucide-react";
import axiosInstance from "../lib/axios";



export default function FolderPage() {
  const { id } = useParams(); // undefined at root

  const [folder, setFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);


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
        setSubfolders(res.data.folders.slice(0,4));
        setNotes(res.data.notes);
      }

      setLoading(false);
    }

  useEffect(() => {

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8 shadow-lg">

      {/* Header */}
      <header className="flex justify-between items-center p-6
       border-x-gray-700 bottom-3 rounded-3xl border-primary">
        <h1 className="text-xl flex gap-2 font-bold text-primary/80 ">

          <FolderClosed size={30}/>{folder ? folder.title : "Home" }
        </h1>

        <div className="flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setShowCreateFolder(true)}
          >
            New Folder
          </button>

           <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateNote(true)}
            >
            New Note
          </button>

        </div>

      </header>
          <h2 className="text-lg text-primary/20  font-semibold ">
          
          </h2>


      {/* Subfolders */}
      {subfolders.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 ">
            {subfolders.map((f) => (
              <FolderCard
                key={f._id}
                id={f._id}
                title={f.title}
                notes={f.notes || []}
              />
            ))}
           
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-5"></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} id={note._id}  />
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
