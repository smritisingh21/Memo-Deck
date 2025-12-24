import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast';
import Note from '../components/Note';
import axiosInstance from '../lib/axios';


export default function Home() {
    const [notes , setNotes] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async() => {
            try{
                const res = await axiosInstance.get('/notes');
                console.log("checking from frontend :",res.data);
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

    <div className='min-h-screen from-primary to-primary via-primary '>
        <Navbar/>
        <div className=' max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-base-100 py-10'>Loading notes...</div>}
       {notes.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
