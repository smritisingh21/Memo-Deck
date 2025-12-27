import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  ArrowLeftIcon, 
  LoaderIcon, 
  Trash2Icon, 
  SaveIcon, 
  ChevronRightIcon, 
  ClockIcon 
} from "lucide-react";
import axiosInstance from "../lib/axios";

export const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/note/${id}`);
         setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/note/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title?.trim() || !note.content?.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);
    try {
      await axiosInstance.patch(`/note/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">

      {/* Top Utility Bar  */}
      <div className="sticky top-0 z-10 w-full bg-base-100/80 
      backdrop-blur-md border-b border-base-200">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <Link to="/" className="hover:bg-base-200/60 px-2 py-1 rounded transition-colors">
              All Notes
            </Link>
            <ChevronRightIcon className="size-4" />
            <span className="text-base-content font-medium truncate max-w-[150px]">
              {note.title || "Untitled"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleDelete} 
              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
              title="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>
            <div className="divider divider-horizontal mx-0"></div>
            <button 
              className="btn btn-primary btn-sm gap-2" 
              disabled={saving} 
              onClick={handleSave}
            >
              {saving ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                <SaveIcon className="size-4" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-xs text-base-content/40 mb-8">
          <ClockIcon className="size-3" />
          <span>Last edited {new Date().toLocaleDateString()}</span>
        </div>

        <div className="space-y-6">
          {/* Notion-style Title: Borderless and Large */}
          <input
            type="text"
            placeholder="Untitled"
            className="w-full bg-transparent text-4xl md:text-5xl 
            font-bold focus:outline-none placeholder:opacity-20"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />

          {/* Content Area: No borders, ample line height */}
          <textarea
            placeholder="Start writing..."
            className="w-full bg-transparent text-lg md:text-xl 
            leading-relaxed min-h-[500px] resize-none focus:outline-none placeholder:opacity-20"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
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
};

export default NoteDetail;