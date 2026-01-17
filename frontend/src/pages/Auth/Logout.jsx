import { useNavigate } from "react-router-dom";
import { LogOut, X } from "lucide-react";

export default function Logout({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base-100 w-[90%] max-w-sm rounded-xl p-6 shadow-xl animate-in fade-in zoom-in">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Logout</h2>
          <button onClick={onClose}>
            <X className="text-base-content/60 hover:text-base-content" />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-base-content/70 mb-6">
          Are you sure you want to logout?
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
