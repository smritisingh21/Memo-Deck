import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";

export default function FolderPage() {
  const { id } = useParams(); // undefined at root

  const [folder, setFolder] = useState(null);
  const [subfolders, setSubfolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      if (id) {
        // 🔹 inside a folder
        const res = await axios.get(`/folder/${id}`);
        setFolder(res.data.folder);
        setSubfolders(res.data.subfolders);
        setNotes(res.data.notes);
      } else {
        // 🔹 root folder (parent === null)
        const res = await axios.get("/root");
        setFolder(null);
        setSubfolders(res.data.folders);
        setNotes(res.data.notes);
      }

      setLoading(false);
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-8">

      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {folder ? folder.title : "All Notes"}
        </h1>

        <div className="flex gap-2">
          <Link
            to={folder ? `/folder/${id}/create` : `/create-folder`}
            className="btn btn-sm"
          >
            New Folder
          </Link>

          <Link
            to={folder ? `/folder/${id}/create-note` : `/create-note`}
            className="btn btn-sm btn-primary"
          >
            New Note
          </Link>
        </div>
      </header>

      {/* Subfolders */}
      {subfolders.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Folders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Notes */}
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

      {/* Empty state */}
      {subfolders.length === 0 && notes.length === 0 && (
        <p className="text-base-content/60">
          This folder is empty
        </p>
      )}
    </div>
  );
}
