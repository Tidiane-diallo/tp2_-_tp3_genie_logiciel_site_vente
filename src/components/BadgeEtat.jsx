import { libellesEtat, libellesDisponibilite } from '../utils/format';

export function BadgeEtat({ etat }) {
  return <span className={`badge badge--${etat}`}>{libellesEtat[etat] ?? etat}</span>;
}

export function BadgeDisponibilite({ disponibilite, quantite }) {
  const texte = disponibilite === 'StockLimite'
    ? `Plus que ${quantite} en stock` : libellesDisponibilite[disponibilite];
  return <span className={`badge badge--${disponibilite}`}>{texte}</span>;
}
