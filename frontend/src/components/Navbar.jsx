import React from 'react'
import {  PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export default function Navbar() {
  return (
    <div className='border border-b-accent'>
        <header className='h-5rem w-50 border-b border-separate'>
        <div className='mx-auto mx-w-6xl p-4'>

            <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold text-accent font-mono tracking-tight'>
                  Memo-Deck : for all your notes
                  </h1>
                <div className='navbar-end flex items-center gap-4'>
                    <Link to={"/create"} className='btn text-white bg-'>
                    <PlusIcon className='size-4 text-accent'/><span>New note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
    </div>
  
  );
}


  
  

