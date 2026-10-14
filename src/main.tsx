import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initializePrivacy } from './privacy';
import './styles.css';

initializePrivacy();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
