import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/Notecard";
import axiosInstance from "../lib/axios";
import { ArchiveIcon, LoaderIcon } from "lucide-react";
import { Star } from "lucide-react";
import { HeartOff } from "lucide-react";
import { ArchiveRestoreIcon } from "lucide-react";


export default function ArchivePage() {
  const [archive, setArchive] = useState({ folders: [], notes: [] });
  const [loading, setLoading] = useState(true);

  async function fetchArchived() {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/archive");
      setArchive({
        folders: res.data.folders || [],
        notes: res.data.notes || []
      });
    } catch (err) {
      console.error("Error fetching archive:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArchived();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 min-h-[50vh] gap-4">
      <LoaderIcon className="animate-spin text-primary" size={40} />
      <p className="text-xs font-bold opacity-30 uppercase tracking-widest">Loading archive...</p>
    </div>
  );

  const hasContent = (archive.folders?.length > 0) || (archive.notes?.length > 0);

  return (
    <div className=" h-screen p-6 space-y-8 animate-in fade-in duration-150 md:p-10 sm:p-5 bg-black/40 rounded-sm ">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 border border-base-300 
      rounded-sm bg-none shadow-sm gap-4">

        <div className="flex gap-4 items-center">
          <div className="p-4 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-2xl">
            <ArchiveIcon className="text-fuchsia-900/80 fill-fuchsia-600" size={32} /> 
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-black underline ">Archive</h1>
            <p className="text-sm font-medium opacity-50 tracking-tight lg:visible md:visible">All your temporarily removed items in one place</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-base-200 rounded-full">
          <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">
            {archive.folders.length + archive.notes.length} Total Items
          </p>
        </div>
      </header>

      {!hasContent ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-30 text-center">
          <ArchiveRestoreIcon size={64} className="mb-6" />
          <h2 className="text-xl font-bold">No archived folders or notes</h2>
          <p className="text-sm max-w-xs mt-2">You can unarchive them or delete them permanently.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Folders Section */}
          {archive.folders.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 ml-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Folders</h2>
                <div className="h-px flex-1 bg-base-content/5"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archive.folders.map(f => (
                  <FolderCard key={f._id} id={f._id} title={f.title} />
                ))}
              </div>
            </section>
          )}

          {/* Notes Section */}
          {archive.notes.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-6 ml-2">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Notes</h2>
                <div className="h-px flex-1 bg-base-content/5"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {archive.notes.map(n => (
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