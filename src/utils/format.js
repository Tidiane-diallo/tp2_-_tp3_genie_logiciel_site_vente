const fmtMontant = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' });
const fmtDate = new Intl.DateTimeFormat('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' });

export const montant = (n) => fmtMontant.format(n ?? 0);
export const date = (iso) => (iso ? fmtDate.format(new Date(`${iso.slice(0, 10)}T12:00:00`)) : '—');

export const libellesEtat = {
  Confirmee: 'Confirmée',
  EnPreparation: 'En préparation',
  Expediee: 'Expédiée',
  Livree: 'Livrée',
  Annulee: 'Annulée',
};

export const libellesDisponibilite = {
  EnStock: 'En stock',
  StockLimite: 'Stock limité',
  Rupture: 'Rupture de stock',
};
