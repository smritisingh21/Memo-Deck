import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";
import axiosInstance from "../lib/axios";
import { LoaderIcon } from "lucide-react";
import { Star } from "lucide-react";
import { HeartOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function FavoritesPage() {
  const [favourite, setFavorites] = useState({ folders: [], notes: [] });
  const [loading, setLoading] = useState(true);

  useAuth();  
  async function fetchFavorites() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/favorites");
      setFavorites({
        folders: res.data.folders || [],
        notes: res.data.notes || []
      });
    } catch (err) {
      console.error("Error fetching favourite:", err);
    } finally {
      setLoading(false);
      
    }
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 min-h-[50vh] gap-4">
      <LoaderIcon className="animate-spin text-primary" size={40} />
      <p className="text-xs font-bold opacity-30 uppercase tracking-widest">Searching your favourites...</p>
    </div>
  );

  const hasContent = (favourite.folders?.length > 0) || (favourite.notes?.length > 0);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 md:p-10 sm:p-5 bg-black/40 rounded-sm ">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 border border-base-300 rounded-[2rem] bg-base-100 shadow-sm gap-4">

        <div className="flex gap-4 items-center">
          <div className="p-4 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-2xl">
            <Star className="text-fuchsia-600 fill-fuchsia-600" size={32} /> 
          </div>
          <div>
            <h1 className="text-2xl font-black underline ">Favorites</h1>
            <p className="text-xs font-medium opacity-50">All your starred items in one place</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-base-200 rounded-full">
          <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">
            {favourite.folders.length + favourite.notes.length} Total Items
          </p>
        </div>
      </header>

      {!hasContent ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
          <HeartOff size={64} className="mb-6" />
          <h2 className="text-xl font-bold">No favourite yet</h2>
          <p className="text-sm max-w-xs mt-2">Start hearting your important notes and folders to see them here.</p>
        </div>
      ) : (
        <div className="space-y-12">

          {/* Folders Section */}
          {favourite.folders.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-6 ml-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Folders</h2>
                <div className="h-px flex-1 bg-base-content/5"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favourite.folders.map(f => (
                  <FolderCard key={f._id} id={f._id} title={f.title} />
                ))}
              </div>
            </section>
          )}

          {/* Notes Section */}
          {favourite.notes.length > 0 && (
            <section>
              <div className="flex items-center justify-center gap-4 mb-6 ml-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Notes</h2>
                <div className="h-px flex-1 bg-base-content/5"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {favourite.notes.map(n => (
                  <NoteCard key={n._id} id={n._id} note={n} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}