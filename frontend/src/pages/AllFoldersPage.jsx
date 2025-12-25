import { useEffect, useState } from "react";
import axios from "../lib/axios";
import FolderCard from "../components/FolderCard";

export default function FoldersPage() {
  const [folders, setFolders] = useState([]);
  const [notes , setNotes] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders= await axios.get("/folders");
        setFolders(folders.data);

      } catch (err) {
        setError("Failed to load folders");
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, []); 

  if (loading) {
    return <div className="p-6">Loading your folders...</div>;
  }

  if (error) {
    return <div className="p-6 text-error">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <header>
        <h3 className="text-xl font-bold">All folders</h3>
      </header>

      {!folders? (
        <p className="text-base-content/60">No folders yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {folders.map((folder) => (
            <FolderCard key={folder._id} title={folder.title} />
          ))}
        </div>
      )}
    </div>
  );
}
