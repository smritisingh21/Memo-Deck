import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import NotePage from './pages/NotePage'
import CreateNote from './pages/CreateNote'

function App() {

  return (
    <div data-theme="forest">
        <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/note/:id' element={<NotePage/>}/>
        <Route  path= '/create' element={<CreateNote/>}/>
      </Routes>
    </div>
    
  )
}

export default App;
