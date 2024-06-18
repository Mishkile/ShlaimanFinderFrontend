import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import { legacy_createStore } from 'redux'

import { Provider } from 'react-redux'

import appReducer from "./redux/appReducer.jsx"
import axios from 'axios'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add Bearer token to headers
  }
  return config;
},
  error => {
    return Promise.reject(error);
  })

const store = legacy_createStore(appReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>

        <App />
      </Provider>


    </BrowserRouter>
  </React.StrictMode>,
)
