import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import Practice from './Practice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <Practice />
  </React.StrictMode>
);