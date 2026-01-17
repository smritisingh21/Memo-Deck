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
} from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import EditBox from "../pages/EditBox";
import Options from "../layouts/Options";

function FolderCard({ id, title, itemsCount, onDeleted }) {
  const [editBox, setEditBox] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
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
    e.preventDefault();
    e.stopPropagation();
    try {
      await axiosInstance.delete(`/folder/${id}`);
      toast.success("Folder deleted");
      onDeleted(id);
    } catch {
      toast.error("Failed to delete folder");
    }
  }

  const handleFavourites = async (id, favourite) => {
    try {
      await axiosInstance.patch(`/folder/${id}`, { favourite });
      if (favourite === true) toast.success("Note added to favourites");
      else toast.success("Note removed from favourites");
    } catch {
      toast.error("error adding to favorites");
    }
  };

  const handleArchive = async (id, archived) => {
    try {
      await axiosInstance.patch(`/folder/${id}`, { archived });
      toast.success("Added to archive");
    } catch {
      toast.error("Could not archive");
    }
  };

  return (
    <div className="relative w-full">
      <Link to={`/folder/${id}`}>
        <section className="relative bg-base-100 border-2 border-primary/40 rounded-none p-6 h-full shadow-[4px_4px_0_0_theme(colors.primary)] hover:shadow-[6px_6px_0_0_theme(colors.primary)] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all cursor-pointer">
          <div ref={menuRef} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderCheck size={20} className="text-accent" />
              <h2 className="text-md font-bold tracking-tight text-base-content line-clamp-1">
                {title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold  text-accent/40 px-2 py-1">
                {itemsCount} items
              </span>

              {!openMenu ? (
                <button
                  aria-label="Open menu"
                  className="= p-1 bg-base-100   transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenu(true);
                  }}
                >
                  <EllipsisVertical />
                </button>
              ) : (
                <button
                  className="border-2 border-secondary p-1 bg-base-100 shadow-[2px_2px_0_0_theme(colors.secondary)] hover:shadow-[3px_3px_0_0_theme(colors.secondary)] transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenu(false);
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </section>
      </Link>

      {openMenu && (
        <div className="z-20 absolute -bottom-24 -right-10 bg-base-100 border-2 border-primary shadow-[6px_6px_0_0_theme(colors.primary)] px-3 py-3 text-sm">
          <div className="flex flex-col gap-2">
            <Options functionality={(e) => handleDelete()} icon={<Trash2Icon size={18} />} label={"Delete"} />
            <Options functionality={(e) => setEditBox(true)} icon={<PenBoxIcon size={18} />} label={"Rename"} />
            <Options functionality={(e) => handleFavourites()} icon={<HeartPlus size={18} />} label={"Favourite"} />
            <Options functionality={(e) => handleArchive()} icon={<ArchiveIcon size={18} />} label={"Archive"} />
          </div>
        </div>
      )}

      {editBox && (
        <EditBox id={id} oldTitle={title} onClose={() => setEditBox(false)} />
      )}
    </div>
  );
}

export default memo(FolderCard);
