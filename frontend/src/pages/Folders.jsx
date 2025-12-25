import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import NoteCard from "../components/Notecard";

export default function FolderPage() {
  const { folderId } = useParams();

  const [folder, setFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFolder() {
      try {
        const res = await axios.get(`/folders/${folderId}`);
        setFolder(res.data);
      } catch (err) {
        setError("Failed to load folder");
      } finally {
        setLoading(false);
      }
    }

    fetchFolder();
  }, [folderId]);

  // 1️⃣ Loading state
  if (loading) {
    return <div className="p-6">Loading folder...</div>;
  }

  if (error) {
    return <div className="p-6 text-error">{error}</div>;
  }

  if (!folder) {
    return <div className="p-6">Folder not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          {folder.title}
        </h1>
        <p className="text-sm text-base-content/60">
          {folder.notes.length} notes
        </p>
      </header>

      {folder.notes.length === 0 ? (
        <p className="text-base-content/50">
          This folder is empty
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folder.notes.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
