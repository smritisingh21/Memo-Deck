import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

export default function CreateFolder() {
  const { parentId } = useParams(); // current folder
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function createFolder() {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await axiosInstance.post("/folder", {
        title,
        parent: parentId || null,
      });

      if (parentId) {
        navigate(`/folder/${parentId}`);
      } else {
        navigate("/folder");
      }

    } catch (err) {
      console.error("Failed to create folder", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-100 rounded-xl shadow-lg p-6 space-y-6">

        <h1 className="text-xl font-bold tracking-tight text-primary">
          Create New Folder
        </h1>

        <div className="space-y-2">
          <label className="text-sm font-medium text-base-content">
            Folder Title
          </label>
          <input
            type="text"
            placeholder="e.g. Study Notes"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            className="btn btn-ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={createFolder}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Folder"}
          </button>
        </div>

      </div>
    </div>
  );
}
