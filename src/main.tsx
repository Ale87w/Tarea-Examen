import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Asegúrate de tener un index.css básico o crea uno vacío

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)