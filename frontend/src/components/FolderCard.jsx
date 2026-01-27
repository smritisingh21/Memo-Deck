import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  Trash2Icon,
  FolderCheck,
  X,
  EllipsisVertical,
  PenBoxIcon,
  ArchiveIcon,
  HeartPlus,
  ArchiveRestoreIcon,
  HeartCrackIcon,
  FolderGit,
  LucideFolderRoot,
  FolderKanbanIcon,
  FoldersIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import EditBox from "../pages/EditBox";
import Options from "../layouts/Options";

function FolderCard({ id, title, itemsCount, onDeleted,  initialArchived, initialFavourite, isArchivePage , isFavouritePage}) {
  const [editBox, setEditBox] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [archive , setArchive] = useState(initialArchived || false)
  const [favourite , setFavourite] = useState(initialFavourite || false)
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleDelete(e) {
    try {
      await axiosInstance.delete(`/folder/${id}`);
      toast.success("Folder deleted");
      onDeleted(id);
    } catch {
      toast.error("Failed to delete folder");
    }
  }

  const handleFavourites = async (favourite) => {
    try {
      await axiosInstance.patch(`/folder/${id}`, { favourite });
      if (favourite === true) toast.success("Added to favourites");
      else toast.success("Removed from favourites");


    } catch {
      toast.error("error adding to favorites");
    }
  };

  const handleArchive = async (archived) => {
    try {
      await axiosInstance.patch(`/folder/${id}`, { archived });
      if(archived == true) toast.success("Added to archive");
      else toast.success("Removed from archive");
      onDeleted(id);

    } catch {
      toast.error("Could not archive");
    }
  };

  return (
    <div className="relative w-full">
      <Link to={`/folder/${id}`}>
        <section className="relative bg-base-100 border-2 border-primary/40
         rounded-lg p-6 h-full shadow-[4px_4px_0_0_theme(colors.primary)]
          hover:shadow-[6px_6px_0_0_theme(colors.primary)] hover:-translate-x-[2px] 
          hover:-translate-y-[2px] transition-all cursor-pointer">

          <div ref={menuRef} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FoldersIcon size={20} className="text-secondary" />
              <h2 className="text-md font-bold tracking-tight text-base-content line-clamp-1">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold  text-accent/40 px-2 py-1">
                {itemsCount} items
              </span>

           {isArchivePage ? (
                <button
                  aria-label="Restore from archive"
                  className="p-1 hover:text-accent transition-all text-emerald-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleArchive(false);
                  }}
                >
                  <ArchiveRestoreIcon size={20} />
                </button>
              ) : isFavouritePage ? (
                <button
                  aria-label="Remove from favourites"
                  className="p-1 text-amber-500 hover:scale-110 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFavourites(false);
                  }}
                >
                  <HeartCrackIcon size={20} />
                </button>
              ) : (
                <button
                  aria-label="Open menu"
                  className="p-1 hover:bg-base-200 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenu(!openMenu);
                  }}
                >
                  {openMenu ? <X size={18} /> : <EllipsisVertical size={20} />}
                </button>
              )}
            </div>
          </div>
        </section>
      </Link>

      {openMenu &&  (
        <div ref={menuRef} className="z-20 absolute -bottom-24 -right-10 bg-base-100 border-2 border-primary shadow-[6px_6px_0_0_theme(colors.primary)] px-3 py-3 text-sm">
          <div className="flex flex-col gap-2">

            
              <>
                <Options functionality={() => {
                   handleDelete();
                  setOpenMenu(false);
                   }} 
                   icon={<Trash2Icon size={16} />} 
                   label="Delete" />
                   
                <Options functionality={() => 
                  { setEditBox(true); 
                  setOpenMenu(false); }}
                   icon={<PenBoxIcon size={16} />} 
                   label="Rename" />

                <Options 
                  functionality={() => { handleFavourites(!favourite); setOpenMenu(false); }} 
                  icon={<HeartPlus size={16} className={favourite ? "fill-emerald-500 text-emerald-500" : ""} />} 
                  label={favourite ? "Unfavourite" : "Favourite"} 
                />
                <Options 
                  functionality={() => { handleArchive(!archive); setOpenMenu(false); }} 
                  icon={<ArchiveIcon size={16} className={archive ? "text-emerald-500" : ""} />} 
                  label={archive ? "Unarchive" : "Archive"} 
                />
              </>
            
        
          </div>
        </div>
      )}

      {editBox && (
        <EditBox 
        id={id}
        oldTitle={title}
        onClose={() => setEditBox(false)} />
      )}
    </div>
  );
}

export default memo(FolderCard);
