import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { LoaderIcon } from "lucide-react";
import FolderCard from "../components/FolderCard";
import Search from "../components/Search";

export default function FoldersPage() {


  const [folders, setFolders] = useState([]);
  const [notes , setNotes] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders= await axiosInstance.get("/folders");
        setFolders(folders.data);

      } catch (err) {
        setError("Failed to load folders");
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, []); 


    const allSearchableItems = [
    ...folders.map(f => ({ ...f, type: 'folder' })),
  ];
 if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-start justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary/60" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-error">{error}</div>;
  }

  return (
    <div className="p-6 space-y-8 shadow-lg animate-in fade-in duration-200  ">
      <header className="flex items-center justify-between mb-10 gap-3">
        <h3 className="text-2xl font-bold">All folders</h3>
      <Search items={allSearchableItems}/>
      </header>

      {!folders? (
        <p className="text-base-content/60">-----No folders yet-----</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 hover:translate-x-1">
          {folders.slice(0,10).map((folder) => (
            <FolderCard
             key={folder._id} 
             id={folder._id}
             title={folder.title} 
             notes={notes} />
          ))}
        </div>
      )}
      
    </div>
  );
}
