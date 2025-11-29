import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
    const [note , setNote] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() =>{
        const fetchNotes = async() =>{
            try{
                const res = await axios.get("http://localhost:8080/api/v1/notes/getAllNotes");
                console.log(res.data);
            }catch(err){
                console.log("error fetching notes");
            }
        }
    })
  return (

    <div className='min-h-screen'>
        <Navbar/>
    </div>
  )
}
