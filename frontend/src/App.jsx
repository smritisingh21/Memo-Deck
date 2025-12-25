import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import NoteDetail from './pages/NoteDetail'

function App() {

  return (
    <div  className="min-h-screen">
        <Routes>
        <Route path= '/notes' element={<Home/>}/>
        <Route path= '/' element={<Home/>}/>
        <Route  path= '/createNote' element={<CreateNote/>}/>
        <Route  path= '/createFolder' element={<CreateFolder/>}/>
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route path="/folders/:folderId" element={<FolderPage />} />
      </Routes>
    </div>
    
  )
}

export default App;
