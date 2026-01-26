import React, { useState, useMemo } from 'react';
import { SearchIcon, FileText, Folder, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Search({ items = [] }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    return items.filter((item) =>
      item.title?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, items]);

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
  };

  const handleSelect = (item) => {
    const path = item.type === 'folder' ? `/folder/${item._id}` : `/note/${item._id}`;
    
    navigate(path);
    
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl ml-auto">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1 group">
          <input
            type="text"
            className="w-full h-11 pl-12 pr-10 bg-primary-content border-2 border-secondary rounded-2xl focus:border-indigo-500 outline-none transition-all shadow-sm"
            placeholder="Search in this folder..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            // Close on escape key
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
          />
          
          <SearchIcon 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors" 
            size={20} 
          />

          {query && (
            <button 
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim() && (
        <>
          {/* Click away overlay to close dropdown */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 max-h-80 overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <button
                    key={item._id}
                    className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors text-left group"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                      {item.type === 'folder' ? (
                        <Folder size={16} className="text-amber-500" />
                      ) : (
                        <FileText size={16} className="text-blue-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {item.type === 'folder' ? 'Folder' : 'Note'}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-zinc-500">No results found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}