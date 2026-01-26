import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import { FolderDotIcon, LoaderIcon } from "lucide-react";
import FolderCard from "../components/FolderCard";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";

export default function FoldersPage() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useAuth();
  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders = await axiosInstance.get("/folders");
        setFolders(folders.data);

      } catch (err) {
        setError("No folders yet");
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

  return (
    <div className= " h-screen p-6 space-y-8 shadow-lg animate-in fade-in duration-150 md:p-10 sm:p-5 bg-tranparent rounded-sm   ">
      <header className="flex items-center justify-between mb-10 gap-3">
        <h3 className="text-2xl font-bold">All folders</h3>
      <Search items={allSearchableItems}/>
      </header>

      {folders.length === 0 ? (
       <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
          <FolderDotIcon size={64} className="mb-6" />
          <h2 className="text-xl font-bold">No folders added yet. </h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 hover:translate-x-1">
          {folders.slice(0,10).map((folder) => (
            <FolderCard
             key={folder._id} 
             id={folder._id}
             title={folder.title? folder.title :"Untitled"} 
             itemsCount={folder.itemsCount}
             notes={folder.notes} />
          ))}
        </div>
      )}
      
    </div>
  );
}
