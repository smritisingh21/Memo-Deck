import React from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import NoteDetail from './pages/NoteDetail'
import FolderPage from './pages/FolderPage'
import AppLayout from './layouts/AppLayout'
import AllFoldersPage from './pages/AllFoldersPage'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import FavouritesPage from './pages/FavouritesPage'


function App() {

  const {theme}  = useTheme();
  return (
    <div  className="min-h-screen min-w-50vw" >
      <AppLayout >
        <ThemeProvider>
        <Routes>
        <Route path= '/' element={<FolderPage/>}/>
        <Route path="/folder/:id" element={<FolderPage />} />
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route  path= '/favourites' element={<FavouritesPage/>}/> {/*root folder */}
        <Route  path= '/folders' element={<AllFoldersPage/>}/> {/*root folder */}
      </Routes>
      </ThemeProvider>
      </AppLayout>
    </div>
    
  )
}

export default App;
