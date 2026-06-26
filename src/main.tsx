import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initBundleData } from './data/bundleData';

const rootEl = document.getElementById('root')!;

initBundleData()
  .then(() => {
    ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    rootEl.innerHTML = `<div style="padding:2rem;text-align:center;color:#D8392B;">
      <h2>Failed to load data</h2>
      <p>${err.message}</p>
      <p style="font-size:0.85rem;color:#666;">Make sure the API server is running (npm run server)</p>
    </div>`;
  });
