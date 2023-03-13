import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DarkModeProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
  </DarkModeProvider>
  </React.StrictMode>
);
