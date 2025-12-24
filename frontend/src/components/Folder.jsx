import React from 'react'
import NoteCard from './Notecard';
import { FolderCheck } from 'lucide-react';
export default function Folder({ title, notes }) {
  return (
    <section className="bg-base/30 rounded-xl p-4 shadow space-y-5 m-6">

    
    <a href="/">
        <div className="flex items-center justify-between">
       <div className='flex items-center justify-center gap-3 mb-4'>
         <FolderCheck size={20}/>
        <h2 className="text-md font-semibold text-balance mb-4 ">
          {title}
        </h2>
       </div>
        <span className="text-sm text-base-content/80">
          {notes.length} notes
        </span>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-base-content/80 p-3">
          No notes in this folder
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 line-clamp-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
      </a>
    </section>
  );
}

