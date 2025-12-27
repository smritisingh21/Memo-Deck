import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import axios from "../lib/axios";

export default function CreateNote({ parentId, onClose,onCreated}) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
        title,
        content,
        parent: parentId || null,
      });

    setLoading(false);
    onCreated();
    onClose();
  }

  return (
    <div className="h-screen flex flex-col ml-40 mr-40 ">

      <div className="flex items-center justify-between px-6 py-4 border-b">
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm gap-2"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="btn btn-primary btn-sm"
          >
            {loading ? "Creating…" : "Create"}
          </button>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-visible space-y-2">
        <input
          type="text"
          placeholder="Note title"
          className="w-full text-3xl mb-5 font-bold outline-none line- bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          

        />

        <textarea
          placeholder="Start writing your note…"
          className="w-full h-full resize-none outline-none bg-transparent text-base leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}

        />
      </div>
    </div>
  );
}
