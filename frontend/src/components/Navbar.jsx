import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const supportedThemes = ["halloween", "forest", "dracula", "aqua"];

  return (
    <div className="border-b mt-1 mb-2 border-neutral md:shrink-0 lg:ml-30 md:ml-10">
      <header className="w-full border-b">
        <div className="mx-auto max-w-6xl p-8">
          <div className="flex items-center justify-between">

            <h1 className="text-4xl font-bold text-primary">
              MemoDeck{" "}
              <span className="text-base-content/70 text-lg font-normal italic">
                - just note it
              </span>
            </h1>

            <div className="flex gap-2 items-center">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-base-200 p-2 rounded-xl">
                {supportedThemes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all
                      ${
                        t === theme
                          ? "bg-primary text-primary-content shadow-md"
                          : "text-base-content/70 hover:bg-base-300"
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
