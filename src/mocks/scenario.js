/**
 * Scénarios de démonstration du prototype statique.
 * Lit le paramètre ?etat= de l'URL pour afficher les états d'erreur
 * (ex. /commande/paiement?etat=refuse). Au TP3, ce fichier disparaît :
 * c'est l'API qui renverra réellement ces erreurs.
 */
export const scenario = () => {
  const { search, hash } = window.location;
  const requete = search || (hash.includes('?') ? hash.slice(hash.indexOf('?')) : '');
  return new URLSearchParams(requete).get('etat');
};
