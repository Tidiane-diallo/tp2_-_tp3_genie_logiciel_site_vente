import { useEffect, useState, useCallback } from 'react';

/**
 * Hook générique : appelle une fonction de service et expose
 * { donnees, chargement, erreur, recharger }.
 * Les hooks de domaine (ViewModel) s'appuient dessus.
 */
export default function useChargement(appel, dependances = []) {
  const [etat, setEtat] = useState({ donnees: null, chargement: true, erreur: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const charger = useCallback(appel, dependances);

  const recharger = useCallback(() => {
    let actif = true;
    setEtat((e) => ({ ...e, chargement: true, erreur: null }));
    charger()
      .then((donnees) => actif && setEtat({ donnees, chargement: false, erreur: null }))
      .catch((erreur) => actif && setEtat({ donnees: null, chargement: false, erreur }));
    return () => { actif = false; };
  }, [charger]);

  useEffect(() => recharger(), [recharger]);

  return { ...etat, recharger };
}
