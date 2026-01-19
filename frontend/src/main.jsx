import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Toaster} from "react-hot-toast"
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider} from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster/>
        </AuthProvider>
     </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
