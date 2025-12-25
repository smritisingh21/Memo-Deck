import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';
import FolderCard from '../components/FolderCard';
import NoteCard from '../components/Notecard';



export default function Home() {
    const [notes , setNotes] = useState([]);
    const [folders , setFolders] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async() => {
            try{
                const notesData = await axiosInstance.get('/notes');
                setNotes(notesData.data)

            }catch(err){
                console.log("error fetching notes");
                console.log(err);
                toast.error("Loading failed ! Please try again after sometime.",{
                    duration:300,
                })
            }finally { 
                setLoading(false);
            }
        }

        const fetchFolders = async() => {
            try{
                const foldersData = await axiosInstance.get('/folders');
                setFolders(foldersData.data)

            }catch(err){
                console.log("error fetching Folders");
                console.log(err);
                toast.error("Loading failed ! Please try again after sometime.",{
                    duration:300,
                })
            }finally { 
                setLoading(false);
            }
        }

        fetchFolders();
        fetchNotes();
    },[])
  return (

    <div className='min-h-screen bg-ghost '>

        <div className=' max-w-7xl mx-auto p-4 mt-6'>
      
        {loading
         && <div className='text-center text-base-100 py-10'>Loading...</div>}
        
        {folders.length > 0 ? (

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>

        {folders.map((folder) => (
            <FolderCard key={folder._id} id={folder._id} title={folder.title} notes={folder.notes}/>
        ))}
         </div>
        ) :
        (
         !loading && <div className='text-center py-10'>No folders found. Create one!</div>
        )}
        
       {notes.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
       
        {notes.map((note) => (
            <NoteCard key={note._id} note={note}/>
        ))}
         </div>
        ) : (
         !loading && <div className='text-center py-10'>No notes found. Create one!</div>
        )}
        </div>
    </div>
  )
}
