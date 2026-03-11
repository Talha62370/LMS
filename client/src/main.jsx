import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppContextprovider } from './context/AppContext.jsx' // Make sure this is wrapping App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextprovider>
        <App />
      </AppContextprovider>
    </BrowserRouter>
  </React.StrictMode>,
)