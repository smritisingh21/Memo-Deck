import React from 'react'
import {  FolderCode, FolderPlusIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className='border-b mt-10 mb-10 border-neutral lg:ml-30 md:ml-10 '>
        <header className='h-5em w-50 border-b '>
        <div className='mx-auto mx-w-6xl p-4'>

            <div className='flex items-center justify-center '>
                <h1 className='text-4xl font-bold text-primary font-sans ' >
                  MemoDeck 
                  </h1>
                   <span className='text-base-content/70 text-lg font-normal '> 
                  <i>- for all your notes</i>
                  </span>
              
            </div>
        </div>
    </header>
    </div>
  
  );
}


  
  

