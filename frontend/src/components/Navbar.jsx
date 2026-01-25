import React, { useState, useRef, useEffect } from "react";
import { GithubIcon, Palette, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const themes = ["halloween", "forest", "dracula", "aqua"];

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header className="w-full ">
      <div className="w-full px-2 py-3 flex items-center justify-between">

        <h1 className="text-2xl font-bold text-primary">
          MemoDeck{" "}
        </h1>

        <div className="relative" ref={menuRef}>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 bg-base-200 rounded-sm border-2 hover:bg-secondary/40
            shadow-[2px_2px_0_0_theme(colors.white)] hover:shadow-[2px_2px_0_0_theme(colors.white)] p-2
            hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all "
            >
            <Palette size={18} />
            <span className="text-sm font-medium hidden sm:block">Theme</span>
          </button>

          <a href={"https://github.com/smritisingh21/Memo-Deck"} target="_blank">
            <button className="bg-base-200  hover:bg-secondary/40 rounded-sm border-2 shadow-[2px_2px_0_0_theme(colors.white)]
             hover:shadow-[2px_2px_0_0_theme(colors.white)] p-2 hover:-translate-x-[4px] hover:-translate-y-[4px] transition-all ">
            <GithubIcon/>
          </button>
          </a>
          
            </div>


          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-base-100 border border-base-300 
            shadow-lg z-50 animate-in fade-in">
              {themes.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm capitalize transition
                    ${
                      theme === t
                        ? "bg-primary text-primary-content"
                        : "hover:bg-primary/20"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
    <div className="border border-gray-400 w-100"></div>
    </div>
    
  );
}
