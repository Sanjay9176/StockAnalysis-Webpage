import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LexpoPage from './LexpoPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LexpoPage/>
  </StrictMode>,
)
