import { useAuth } from "../../context/AuthContext";
import { LogOut ,X} from "lucide-react";
import { useNavigate } from "react-router";

export default function Logout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

return (
    <>
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" >
          <div className="w-full max-w-sm bg-base-100 border-4 border-error shadow-[8px_8px_0_0_theme(colors.error)] p-6
              space-y-6 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-center">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-error flex items-center justify-center gap-2">
                  <LogOut size={24} />
                  Logout
                </h3>
                <p className="text-sm text-base-content/60">
                  Are you sure you want to leave?
                </p>
              </div>
              
            </div>

          
            {user?.name && (
              <div className="
                p-3
                border-2 border-base-content/20
                bg-base-200/50
              ">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-50">
                  Current User
                </p>
                <p className="text-sm font-bold mt-1">
                  {user.name}
                </p>
                {user.email && (
                  <p className="text-xs opacity-60 mt-0.5">
                    {user.email}
                  </p>
                )}
              </div>
            )}

   
            <p className="text-sm text-base-content/80">
              You'll need to log in again to access your notes and folders.
            </p>

   
            <div className="flex gap-3 pt-2">
      
              <button
                onClick={() => navigate("/")}
                className="
                  flex-1
                  py-3
                  font-bold
                  border-2 border-base-content
                  bg-base-100
                  text-base-content
                  shadow-[4px_4px_0_0_theme(colors.base-content)]
                  hover:shadow-[6px_6px_0_0_theme(colors.base-content)]
                  hover:translate-x-[-2px]
                  hover:translate-y-[-2px]
                  transition-all
                  active:translate-x-[1px]
                  active:translate-y-[1px]
                  active:shadow-[2px_2px_0_0_theme(colors.base-content)]
                "
              >
                Cancel
              </button>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="
                  flex-1
                  py-3
                  font-bold
                  border-2 border-error
                  bg-error
                  text-error-content
                  shadow-[4px_4px_0_0_theme(colors.error)]
                  hover:shadow-[6px_6px_0_0_theme(colors.error)]
                  hover:translate-x-[-2px]
                  hover:translate-y-[-2px]
                  transition-all
                  active:translate-x-[1px]
                  active:translate-y-[1px]
                  active:shadow-[2px_2px_0_0_theme(colors.error)]
                "
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      
    </>
  );
}