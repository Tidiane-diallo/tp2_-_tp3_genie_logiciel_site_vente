import Alerte from './Alerte';

/** Affiche le chargement ou l'erreur d'un hook, sinon ses enfants. */
export default function Chargement({ etat, children }) {
  if (etat.chargement) {
    return <p className="chargement" aria-live="polite"><span className="chargement__roue" aria-hidden="true" /> Chargement…</p>;
  }
  if (etat.erreur) return <Alerte type="erreur" titre="Une erreur est survenue">{etat.erreur.message}</Alerte>;
  return children(etat.donnees);
}
