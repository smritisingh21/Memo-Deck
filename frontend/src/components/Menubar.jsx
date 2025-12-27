import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SIDE_MENU_DATA } from "../SideMenu";

export default function Menubar() {
  const [open, setOpen] = useState(false);
  

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-base-200 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 shadow-sm shadow-primary-content/50 
          bg-base-400 border-r border-base-300
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-4 mt-10 font-bold text-lg text-primary">
          Memo Deck
        </div>

        <nav className="flex flex-col gap-2 p-4">
        {SIDE_MENU_DATA.map((item) => {
        const Icon = item.icon;

        return (
         <a
        key={item.id}
        href={item.path}
        className="flex items-center gap-3 rounded-lg p-3 
        hover:bg-primary-content/10 transition hover:translate-x-1 hover:transition-transform "
         >
        <Icon size={18} className="text-accent" />
        <span className="text-accent/40">{item.name}</span>
      </a>
        )})}
    </nav>

      </aside>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
