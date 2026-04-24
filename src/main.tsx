import React from 'react';
import './index.css';
import './map.css';
import ReactDOM from 'react-dom/client';
import { scan } from 'react-scan'; // must be imported before React and React DOM
import App from './App.tsx';

scan({
  enabled: import.meta.env.MODE === 'development',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
