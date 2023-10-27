import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './components/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
 <BrowserRouter>
  <App />
 </BrowserRouter>
 </AuthProvider>
   
  
);


