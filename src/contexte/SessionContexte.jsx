import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

/**
 * Session simulée. Au TP3 : jeton JWT renvoyé par AuthController.
 * Le stockage navigateur est protégé par try/catch (indisponible dans certains contextes).
 */
const SessionContexte = createContext(null);
const CLE = 'session-commerce';

const lire = () => { try { return JSON.parse(sessionStorage.getItem(CLE)); } catch { return null; } };
const ecrire = (v) => {
  try {
    if (v) sessionStorage.setItem(CLE, JSON.stringify(v));
    else sessionStorage.removeItem(CLE);
  } catch { /* stockage indisponible : ignoré */ }
};

export function SessionFournisseur({ children }) {
  const [session, setSession] = useState(lire);

  const connecter = async (courriel, motDePasse) => {
    const resultat = await authService.connecter(courriel, motDePasse);
    setSession(resultat); ecrire(resultat);
    return resultat;
  };

  const deconnecter = async () => {
    await authService.deconnecter();
    setSession(null); ecrire(null);
  };

  return (
    <SessionContexte.Provider value={{ estConnecte: !!session, client: session?.client, connecter, deconnecter }}>
      {children}
    </SessionContexte.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContexte);
