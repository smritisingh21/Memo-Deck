import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast';
import Note from '../components/Note';
import axiosInstance from '../lib/axios';
import Menubar from '../components/Menubar';
import Folder from '../components/Folder';


export default function Home() {
    const [notes , setNotes] = useState([]);
    const [loading , setLoading] = useState(true);
    
    
    const note = [
  {
    id: "1",
    title: "React Hooks",
    content: "useState, useEffect, useMemo...",
  },
  {
    id: "2",
    title: "Backend Bugs",
    content: "Never trust console.log 😭",
  },
];

    useEffect(() =>{
        const fetchNotes = async() => {
            try{
                const res = await axiosInstance.get('/notes');
                setNotes(res.data)

            }catch(err){
                console.log("error fetching notes");
                console.log(err);
                toast.error("Loading failed ! Please try again after sometime.",{
                    duration:700,
                })
            }finally { 
                setLoading(false);
            }
        }
        fetchNotes();
    },[])
  return (

    <div className='min-h-screen bg-ghost lg:ml-60 md:ml-30 '>
        <Navbar/>
        <Menubar/>
        

        <div className=' max-w-7xl mx-auto p-4 mt-6'>
        <Folder title="Study Notes" notes={note} />
        <Folder title="Work Notes" notes={[]} />
        {loading && <div className='text-center text-base-100 py-10'>Loading notes...</div>}
        
       {notes.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
       
        {notes.map((note) => (
            <Note key={note._id} note={note}/>
        ))}
         </div>
        ) : (
         !loading && <div className='text-center py-10'>No notes found. Create one!</div>
        )}
        </div>
    </div>
  )
}
