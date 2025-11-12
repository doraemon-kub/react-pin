//react dependencies
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//user components
import App from './App.jsx'
//stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)