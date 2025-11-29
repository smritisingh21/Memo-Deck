import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Toaster} from "react-hot-toast"
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
