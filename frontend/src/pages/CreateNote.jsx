import { ArrowLeft, X, XIcon } from "lucide-react";
import { useState } from "react";
import { Link ,useNavigate } from "react-router";
import axios from "../lib/axios";
import { 
  ArrowLeftIcon, 
  LoaderIcon, 
  Trash2Icon, 
  SaveIcon, 
  ChevronRightIcon, 
  ClockIcon 
} from "lucide-react";
export default function CreateNote({ parentId, onClose,onCreated}) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

    const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); 
      handleCreate();
    }
    
    if (e.key === 'Escape') {
      onClose();
    }
  };

  async function handleCreate() {
    if (!title.trim()) return;

    setLoading(true);
     const url = parentId ? `/note/${parentId}` : `/note`;
     
      await axios.post(url, {
        title : title || null,
        content,
        type:"note",
        parent: parentId || null,
      });

    setLoading(false);
    onCreated();
    onClose();
  }


  return (
  
    <div className=" bg-base-100 text-base-content pt-10 m-0">

      <div className="bg-primary fixed bottom-5 left-10 blur-xl z-10 opacity-80 h-50 w-50 rounded-full">hey</div>

      {/* Top Utility Bar  */}
      <div className=" w-full bg-base-100/80 
      backdrop-blur-md border-b border-base-200">

        <div className="max-w-4xl mx-auto px-6 py-5 h-14 flex items-center justify-between bg-black border-2 border-primary/20 ">
          <div className="flex items-center gap-2 text-sm text-base-content/60 ">
          
          <button onClick={() => onClose() }>
          <div className="flex items-center hover:bg-slate-800 p-1.5 rounded transition-colors cursor-pointer ">
          <ArrowLeftIcon className="size-4" />Go back
          </div>
          </button>

          <ChevronRightIcon className="size-4" />
            <span className="text-base-content font-medium truncate max-w-[150px]">
              {title || "Untitled"}
            </span>

         </div>

          <div className="flex items-center gap-2">
            {/* <button 
              onClick={() => onClose() } 
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              title=""
            >
              <XIcon className="size-4" />Cancel
            </button> */}

            <div className="divider divider-horizontal mx-0"></div>
            <button 
              className="btn btn-primary btn-sm gap-2" 
              onClick={handleCreate}
            >
              {saving ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                <SaveIcon className="size-4" />
              )}
              {saving ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-5xl mx-auto px-20 pt-12 pb-24 bg-black/40 ">
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-base-content/40 mb-8">
          <ClockIcon className="size-3" />
          <span>Last edited {new Date().toLocaleDateString()}</span>
        </div>

        <div className="space-y-6 h-full">
          {/* Notion-style Title: Borderless and Large */}
          <input
            type="text"
            placeholder="Untitled"
            className="w-full bg-transparent mb-md text-4xl md:text-4xl 
            font-bold focus:outline-none placeholder:opacity-20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Content Area: No borders, ample line height */}
          <textarea
            placeholder="Start writing..."
            className="w-full h-screen overflow-y-visible  bg-transparent text-md md:text-md 
            leading-relaxed  resize-none focus:outline-none placeholder:opacity-20"
            value={content}
            onChange={(e) => setContent( e.target.value )}
          />
        </div>
      </div>

      {/* Floating Back Action for Mobile */}
      <Link 
        to="/" 
        className="fixed bottom-6 left-6 md:hidden btn btn-circle btn-neutral shadow-lg"
      >
        <ArrowLeftIcon className="size-5" />
      </Link>
    </div>
  );
}
