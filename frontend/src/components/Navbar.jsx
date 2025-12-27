import React from 'react'
import {  FolderCode, FolderPlusIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className='border-b mt-10 mb-10 border-neutral lg:ml-30 md:ml-10 '>
        <header className='h-5em w-50 border-b '>
        <div className='mx-auto mx-w-6xl p-4'>

            <div className='flex items-center justify-between '>
                <h1 className='text-2xl font-bold text-accent font-mono tracking-tight' >
                  Memo-Deck : for all your notes
                  </h1>
              
            </div>
        </div>
    </header>
    </div>
  
  );
}


  
  

