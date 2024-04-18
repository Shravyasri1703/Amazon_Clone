import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateProvider } from './StateProvider.jsx'
import Reducer, { initialState } from './reducer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initialState} Reducer={Reducer}>
    <App />
    </StateProvider>
   
  </React.StrictMode>,
)
