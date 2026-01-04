import React from 'react'
import {  FolderCode, FolderPlusIcon, PlusIcon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {

  const { theme, setTheme } = useTheme();
  const supportedThemes = ['halloween' , 'dark' , 'forest' ,'dracula']
  
  return (
    <div className='border-b mt-10 mb-10 border-neutral md:shrink-0 lg:ml-30 md:ml-10 '>
        <header className='max-h-full w-full border-b '>
        <div className='mx-auto mx-w-6xl p-8'>

            <div className='flex items-center justify-between '>
                <h1 className='text-4xl font-bold text-primary font-sans ' >
                  MemoDeck 
                   <span className='text-base-content/70 text-lg font-normal '> 
                  <i>- for all your notes</i>
                  </span>
                  </h1>
                  
        <div className='flex gap-2 justify-center items-center '>
           <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2 bg-base-200  sm:shrink-0">
            {supportedThemes.map((theme) => (
              <button 
                key={theme}
                onClick={() => setTheme(theme)}
                className={`px-3 py-1.5 text-xs hover:bg-transparent  hover:text-white hover:translate-x-2 font-bold  rounded-xl transition-all duration-200 ${
                  theme === theme 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'hover:bg-base-300 text-base-content/70'
                }`}
              >
                {theme}
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


  
  

