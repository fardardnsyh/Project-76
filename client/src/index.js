import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApiProvider} from './API/ApiContext'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <ApiProvider>
    <App />
   </ApiProvider>
  </React.StrictMode>
);
reportWebVitals();
