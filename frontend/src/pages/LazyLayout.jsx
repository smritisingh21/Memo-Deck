import React, { useState, useEffect } from 'react';
import { NotebookPen, NotebookPenIcon, PencilLine, PenLine, Scissors } from 'lucide-react';

const LazyLayout = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[999] bg-[#FCFCF9] flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* 1. GRID PAPER BACKGROUND */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(#000 0.5px, transparent 0.5px), radial-gradient(#000 0.5px, #FCFCF9 0.5px)`,
          backgroundSize: '20px 20px'
        }} 
      />

      {/* 2. THE CENTRAL "NOTEBOOK" CARD */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="bg-white border-[3px] border-black p-8 shadow-[8px_8px_0_0_#000] relative">
          
          {/* Binder Rings Decor */}
          <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-around py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-3 bg-[#FCFCF9] border-2 border-black rounded-full" />
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="p-4 bg-yellow-300 border-2 border-black shadow-[4px_4px_0_0_#000] animate-bounce">
              <NotebookPenIcon size={40} className="text-black" strokeWidth={2.5} />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-black text-black uppercase italic tracking-tight mb-1">
                Ink Loading...
              </h2>
              <p className="text-[10px] font-bold text-black/60 uppercase tracking-tighter">
                Organizing Thoughts / MemoDeck v2.1
              </p>
            </div>

            {/* THE PEN-STROKE PROGRESS BAR */}
            <div className="w-full mt-4 space-y-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-1 text-[10px] font-black text-black uppercase">
                  <PencilLine size={12} /> Drafting
                </div>
                <span className="text-sm font-black tabular-nums">{Math.floor(progress)}%</span>
              </div>
              
              <div className="h-6 w-full border-2 border-black bg-black/5 p-1 relative overflow-hidden">
                <div 
                  className="h-full bg-black transition-all duration-300 ease-out flex items-center justify-end overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                    {/* Scribble effect inside the bar */}
                    <div className="whitespace-nowrap text-[8px] text-white font-black opacity-20 pr-2">
                        MEMODECKMEMODECKMEMODECK
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating "Torn Paper" Meta Tag */}
        <div className="absolute -bottom-12 -right-2 rotate-3 bg-blue-400 border-2 border-black px-4 py-1 shadow-[4px_4px_0_0_#000]">
           <span className="text-[10px] font-black text-black uppercase flex items-center gap-2">
             <Scissors size={10} /> Cut Here
           </span>
        </div>
      </div>

      {/* Decorative Corner Labels */}
      <div className="absolute top-8 left-8 border-l-2 border-t-2 border-black p-2 hidden md:block">
        <p className="text-[9px] font-black uppercase text-black/40">File: initialization.sys</p>
      </div>
      
      <div className="absolute bottom-8 right-8 text-right hidden md:block">
        <p className="text-[10px] font-black text-black">
          "The pen is mightier than the bug."
        </p>
        <p className="text-[8px] font-bold text-black/30 mt-1 uppercase tracking-widest">
          © 2026 Archive Engine
        </p>
      </div>
    </div>
  );
};

export default LazyLayout;