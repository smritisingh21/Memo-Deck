import React from 'react'
import NoteCard from './Notecard';
import { FolderCheck } from 'lucide-react';
export default function Folder({ title, notes }) {
  return (
    <section className="bg-base/30 rounded-xl p-4 shadow space-y-5 m-6">

    
    <a href="/">
        <div className="flex items-center justify-between">
       <div className='flex items-center justify-around gap-3 mb-4'>
         <FolderCheck size={20}/>
        <h2 className="text-md text-accent font-semibold text-balance ">
          {title}
        </h2>
       </div>
        <span className="text-sm text-base-content/80">
          {notes.length} notes
        </span>
      </div>
      </a>
    </section>
  );
}

