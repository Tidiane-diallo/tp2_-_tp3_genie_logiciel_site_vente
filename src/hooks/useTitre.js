import { useEffect } from 'react';

/** Titre de l'onglet du navigateur, propre à chaque page (repère pour l'historique et les lecteurs d'écran). */
export default function useTitre(titre) {
  useEffect(() => {
    document.title = titre ? `${titre} · Comptoir Boréal` : 'Comptoir Boréal';
  }, [titre]);
}
