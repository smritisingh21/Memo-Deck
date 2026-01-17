import { useState } from "react";
import { Menu, User2Icon, X } from "lucide-react";
import { SIDE_MENU_DATA } from "../SideMenu";

export default function Menubar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-none bg-base-100 border-2 border-secondary 
                   shadow-[3px_3px_0_0_hsl(var(--s))] md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64  border-r-2 
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold text-primary mt-10">MemoDeck{" "}</h1>
         <span className="text-base-content/60 text-sm font-normal">
            — just note it
          </span>


        <div className="flex items-center justify-center rounded-full mt-20 ">
         <div className="">
          <User2Icon size={50}/>
         </div>

        </div>

        <div className="p-5 mt-6 font-bold text-lg text-primary  ">
          Username
        </div>

        <nav className="flex flex-col gap-2 px-3 mt-12">
          {SIDE_MENU_DATA.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-sm
                           border-2 border-transparent
                           hover:border-accent
                           hover:bg-base-200
                           shadow-[2px_2px_0_0_transparent]
                           hover:shadow-[2px_2px_0_0_hsl(var(--s))]
                           transition-all"
              >
                <Icon size={18} className="text-accent" />
                <span className="text-sm font-bold text-base-content">{item.name}</span>
              </a>
            );
          })}
        </nav>

      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
