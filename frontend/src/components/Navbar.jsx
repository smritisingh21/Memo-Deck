import React, { useState, useRef, useEffect } from "react";
import { Palette, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
    <header className="w-full border-b border-base-300 bg-base-100">
      <div className="w-full px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          Welcome Back!!{" "}
          <span className="text-base-content/60 text-sm font-normal">
             smriti
          </span>
        </h1>

        {/* Theme Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200 hover:bg-base-300 transition"
          >
            <Palette size={18} />
            <span className="text-sm font-medium hidden sm:block">Theme</span>
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-base-100 border border-base-300 shadow-lg z-50 animate-in fade-in">
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
                        : "hover:bg-base-200"
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
  );
}
