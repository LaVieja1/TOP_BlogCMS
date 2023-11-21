import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import Routes from './Routes';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter basename='/'>
    <Routes />
  </HashRouter>
)
