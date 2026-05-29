import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadSaves } from './hooks/useSaveGame'

// Hydrate stores before React mounts — avoids render-phase state conflicts
loadSaves()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
