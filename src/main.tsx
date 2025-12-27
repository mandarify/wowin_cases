import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import "./01_Assets/01_styles/index.css";
import App from './02_App/App.tsx';

createRoot(document.getElementById('wrapper')!).render(
   <StrictMode>
      <App />
   </StrictMode>,
);
