import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";

export default function FolderPage() {
  
  const { id } = useParams();

  const [folder, setFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    async function fetchFolder() {
      const res = await axios.get(`/folder/${id}`);
      setFolder(res.data.folder);
      setSubfolders(res.data.subfolders);
      setNotes(res.data.notes);
      setLoading(false);
    }

    fetchFolder();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  else{

  return (
    <div className="p-6 space-y-8">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {folder.title}
        </h1>

        <div className="flex gap-2">
          <Link to={`/folder/${id}/create`} className="btn btn-sm">
            New Folder
          </Link>
          <Link to={`/folder/${id}/create-note`} className="btn btn-sm btn-primary">
            New Note
          </Link>
        </div>
      </header>

      {subfolders.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subfolders.map((f) => (
              <FolderCard key={f._id} id={f._id} title={f.title} notes={f.notes} />
            ))}
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </section>
      )}

      {subfolders.length === 0 && notes.length === 0 && (
        <p className="text-base-content/60">
          This folder is empty
        </p>
      )}
    </div>
  );
}
}