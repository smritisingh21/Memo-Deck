import React from 'react'
import {  FolderCode, FolderPlusIcon, PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className='border-b border-neutral'>
        <header className='h-5rem w-50 border-b border-separate'>
        <div className='mx-auto mx-w-6xl p-4'>

            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-accent font-mono tracking-tight'>
                  Memo-Deck : for all your notes
                  </h1>
                  <div className='flex items-center justify-around gap-2'>
                  <div className='flex items-center gap-1'>

                    <Link to={"/create"} className='btn text-primary-content/60 bg-'>
                    <PlusIcon className='size-4 text-accent'/><span>New note</span>
                    </Link>
                </div>

                <div className='flex items-center gap-2'>
                    <Link to={"/create"} className='btn text-primary-content/60 bg-'>
                    <FolderPlusIcon className='size-4 text-accent'/><span>Create New Folder</span>
                    </Link>
                </div>
                  </div>
              
            </div>
        </div>
    </header>
    </div>
  
  );
}


  
  

