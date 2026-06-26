import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initBundleData } from './data/bundleData';

const rootEl = document.getElementById('root')!;

initBundleData().then(() => {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
