import { useState } from "react";
import { Menu, User2Icon, X } from "lucide-react";
import { SIDE_MENU_DATA } from "../SideMenu";
import { useAuth } from "../context/AuthContext";

export default function Menubar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  useAuth();


  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-none bg-base-100 border-2 border-secondary shadow-[3px_3px_0_0_hsl(var(--s))] md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-base-100 border-r-2 border-primary/10
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b-2 border-base-content/10">
          <h1 className="text-2xl font-bold text-primary">
            MemoDeck
          </h1>
          <span className="text-base-content/60 text-sm font-normal">
            — just note it
          </span>
        </div>

        <div className="p-6 mt-4">
          <div className="
            flex flex-col items-center gap-3
            p-4
            shadow-[4px_4px_0_0_hsl(var(--p))]
          ">
            <div className="p-3 border-2 rounded-full border-secondary bg-base-100 shadow-[3px_3px_0_0_hsl(var(--s))]
            ">
              <User2Icon size={40} className="text-secondary" />
            </div>

            <div className="text-center w-full min-h-[3.5rem] flex flex-col justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="loading loading-spinner loading-sm text-primary"></div>
                  <p className="text-xs text-base-content/40">Loading...</p>
                </div>
              ) : user.user? (
                <>
                  <p className="font-bold text-base text-primary truncate px-2">
                    {user?.user.name }
                  </p>
                  {user.user.email && (
                    <p className="text-xs text-base-content/60 truncate mt-1 px-2">
                      {user?.user.email}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-base-content/60">Guest User</p>
              )}
            </div>

         
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 px-4 mt-6">
          {SIDE_MENU_DATA.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.path}
                className="
                  flex items-center gap-3 px-4 py-3
                  border-2 border-transparent
                  hover:border-secondary
                  hover:bg-base-200
                  shadow-[2px_2px_0_0_transparent]
                  hover:shadow-[3px_3px_0_0_hsl(var(--s))]
                  transition-all
                  font-semibold
                "
                onClick={() => setOpen(false)}
              >
                <Icon size={18} className="text-secondary" />
                <span className="text-sm">{item.name}</span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}