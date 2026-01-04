import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import NoteDetail from './pages/NoteDetail'
import FolderPage from './pages/FolderPage'
import AppLayout from './layouts/AppLayout'
import AllFoldersPage from './pages/AllFoldersPage'
import ArchivePage from './pages/ArchivePage'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Settings from './pages/Settings'
import Login from './pages/Auth/Login'
import FavouritesPage from './pages/FavouritesPage'
import AuthLayout from './layouts/AuthLayout'
import Signup from './pages/Auth/Signup'


function App() {

  const {theme}  = useTheme();
  return (
    <div  className="min-h-screen min-w-50vw" >
        
        <Routes>
        <Route path= '/login' element={<Login/>}/>
        <Route path= '/signup' element={<Signup/>}/>
      </Routes>

      <AppLayout >
        <ThemeProvider>
        <Routes>
        <Route path= '/' element={<FolderPage/>}/>
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route  path= '/folders' element={<AllFoldersPage/>}/> 
        <Route  path= '/favourites' element={<FavouritesPage/>}/> 
        <Route  path= '/archive' element={<ArchivePage/>}/> 
        <Route  path= '/settings' element={<Settings/>}/> 
      </Routes>
      </ThemeProvider>
      </AppLayout>
    </div>
    
  )
}

export default App;
