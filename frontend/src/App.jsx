import React from 'react'
import { Suspense } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import NoteDetail from './pages/NoteDetail'
import FolderPage from './pages/FolderPage'
import AppLayout from './layouts/AppLayout'
import AllFoldersPage from './pages/AllFoldersPage'
import ArchivePage from './pages/ArchivePage'
import ProtectedRoute from './pages/Auth/ProtectedRoutes'
import FavouritesPage from './pages/FavouritesPage'
import LazyLayout from './pages/LazyLayout'
import Logout from './pages/Auth/Logout'

function App() {
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Signup = React.lazy(() => import('./pages/Auth/Signup'));

  return (
    <div  className="min-h-screen min-w-50vw" >
     <Suspense fallback={<LazyLayout />}>
       <Routes>
         <Route path= '/login' element={<Login/>}/>
        <Route path= '/signup' element={<Signup/>}/>
        <Route path= '/logout' element={<Logout/>}/>

      <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path= '/' element={<FolderPage/>}/>
        <Route path='/folder/:id' element={<FolderPage />} />
        <Route  path= '/note/:id' element={<NoteDetail/>}/>
        <Route  path= '/folders' element={<AllFoldersPage/>}/> 
        <Route  path= '/favourites' element={<FavouritesPage/>}/> 
        <Route  path= '/archives' element={<ArchivePage/>}/> 
      </Route>
      </Routes>
     </Suspense>
    </div>
    
  )
}

export default App;






 