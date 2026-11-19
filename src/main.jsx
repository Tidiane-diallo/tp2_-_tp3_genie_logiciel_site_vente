import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { SessionFournisseur } from './contexte/SessionContexte';
import App from './App';
import './styles.css';

// HashRouter seulement pour l'aperçu hébergé (VITE_ROUTEUR=hash) ; BrowserRouter en développement et au TP3.
const Routeur = import.meta.env.VITE_ROUTEUR === 'hash' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routeur>
      <SessionFournisseur>
        <App />
      </SessionFournisseur>
    </Routeur>
  </StrictMode>,
);
