import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import NoteDetail from './pages/NoteDetail'

function App() {

  return (
    <div data-theme="forest">
        <Routes>
        <Route path= '/notes' element={<Home/>}/>
        <Route path= '/' element={<Home/>}/>
        <Route  path= '/create' element={<CreateNote/>}/>
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
      </Routes>
    </div>
    
  )
}

export default App;
