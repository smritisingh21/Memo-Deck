import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import NoteDetail from './pages/NoteDetail'
import FolderPage from './pages/FolderPage'
import AppLayout from './layouts/AppLayout'
import AllFoldersPage from './pages/AllFoldersPage'
    // themes: ['forest' , 'halloween','abyss' ,'' , 'dracula','dark'],

function App() {

  return (
    <div  className="min-h-screen min-w-50vw" data-theme ='dark'>
      <AppLayout>
        <Routes>
        <Route path= '/' element={<FolderPage/>}/>
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route  path= '/folders' element={<AllFoldersPage/>}/> {/*root folder */}

      </Routes>
      </AppLayout>
    </div>
    
  )
}

export default App;
