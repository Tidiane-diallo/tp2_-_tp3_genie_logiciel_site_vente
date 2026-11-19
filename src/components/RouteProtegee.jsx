import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../contexte/SessionContexte';

/** 4.1 : « Pour passer une commande, le client doit être authentifié. » */
export default function RouteProtegee({ children }) {
  const { estConnecte } = useSession();
  const lieu = useLocation();
  if (!estConnecte) {
    return <Navigate to={`/connexion?retour=${encodeURIComponent(lieu.pathname + lieu.search)}`} replace />;
  }
  return children;
}
