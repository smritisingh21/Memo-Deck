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
   const handleFavourites =async (id , favourite ,) =>{
      try{
        const res = await axiosInstance.patch(`/folder/${id}` , {
         favourite,
        })
        if(favourite === true) toast.success("Note added to favourites");
        else toast.success("Note removed from favourites");
        
      }catch(err){
        console.log("error adding to favorites");
        toast.error("error adding to favorites")
      }
    }
    const handleArchive =async (id , archived) =>{
      try{
        await axiosInstance.patch(`/folder/${id}` , {
         archived,
        } )
        toast.success("Added to archive");
      }catch(err){
        console.log("Could not archive");
        toast.error("Could not archive")
      }
    }

  return (
    <div className="relative w-full">
      <Link to={`/folder/${id}`}>

        <section className="relative bg-primary/20 rounded-xl p-6 h-full
          shadow-sm hover:shadow-md transition-all border border-transparent
          hover:border-primary/20 ">

          <div ref={menuRef} className="flex items-center justify-between">

            <div className="flex items-center justify-center gap-3">

              <FolderCheck size={20} className="text-accent/80" />
              <h2 className="text-md font-semibold line-clamp-1">
                {title}
              </h2>
            </div>

             
            <div className="flex items-center justify-center">
              <span className="text-sm text-base-content/30 m-3">
              {itemsCount} items
              </span>
            {!openMenu ? (
              <button
                aria-label="Open menu"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(true);
                }}
              >
                <EllipsisVertical className="text-neutral-content" />
              </button>
            ) : (
               <button
                 onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenMenu(false);
                  className="text-red-500"
                 }}
                >
                <X size={25} />
                </button>
              
            )}
          </div>

          </div>

       
        </section>
      </Link>
      {
        openMenu &&
         <div className="z-20 flex-cols-1 items-center justify-center bg-base-100 h-50 w-50 
                rounded-lg shadow px-4 py-3 animate-in fade-in absolute -bottom-20 -right-16 text-md">
                
                <button
                  onClick={(e) =>{
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete();
                    setOpenMenu(false);
                  }}
                  className="text-gray-600 hover:text-red-600 flex items-center rounded-md justify-center gap-2 "
                >
                  <Trash2Icon size={18} />Delete
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditBox(true);
                  }}
                  className="text-gray-600 hover:text-base-content flex items-center justify-center gap-2"
                >
                  <PenBoxIcon size={18} />Edit
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleArchive();
                    setOpenMenu(false);

                  }}
                  className="text-gray-600 hover:text-base-content flex items-center justify-center gap-2"
                >
                  <ArchiveIcon size={18} />Archive
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenMenu(false);
                    handleFavourites();
                    setOpenMenu(false);

                  }}
                  className="text-gray-600 hover:text-base-content flex items-center justify-center gap-2"
                >
                  <HeartPlus size={18} />Favourite
                </button>

               
              </div>
             
      }
      {editBox && (
        <EditBox
          id={id}
          oldTitle={title}
          onClose={() => setEditBox(false)}
        />
      )}
    </div>
  );
}

export default memo(FolderCard);


