import { montant } from '../utils/format';

/** Les montants viennent toujours du serveur (DTO) : aucun calcul ici. */
export default function ResumeMontants({ sousTotal, taxes, fraisLivraison, total, libelleTotal = 'Total' }) {
  return (
    <dl className="montants">
      <div><dt>Sous-total</dt><dd>{montant(sousTotal)}</dd></div>
      <div><dt>TPS (5 %)</dt><dd>{montant(taxes.tps)}</dd></div>
      <div><dt>TVQ (9,975 %)</dt><dd>{montant(taxes.tvq)}</dd></div>
      {fraisLivraison !== undefined && (
        <div><dt>Frais de livraison</dt><dd>{montant(fraisLivraison)}</dd></div>
      )}
      <div className="montants__total"><dt>{libelleTotal}</dt><dd>{montant(total)}</dd></div>
    </dl>
  );
}
