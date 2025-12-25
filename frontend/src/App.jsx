import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import NoteDetail from './pages/NoteDetail'
import CreateFolder from './pages/CreateFolder'
import FolderPage from './pages/FolderPage'
import AppLayout from './layouts/AppLayout'
import AllFoldersPage from './pages/AllFoldersPage'

function App() {

  return (
    <div  className="min-h-screen">
      <AppLayout>
        <Routes>
        <Route path= '/notes' element={<Home/>}/>
        <Route path= '/' element={<Home/>}/>
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route  path= '/create-note' element={<CreateNote/>}/> 
        <Route  path= '/note/:parentId/create' element={<CreateNote/>}/> {/*note inside folder */}

        <Route  path= '/folders' element={<AllFoldersPage/>}/> {/*root folder */}
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route  path= '/create-folder' element={<CreateFolder/>}/> {/*root folder */}
         <Route path="/folder/:parentId/create" element={<CreateFolder />} />{/*sub-folder */}

      </Routes>
      </AppLayout>
    </div>
    
  )
}

export default App;
