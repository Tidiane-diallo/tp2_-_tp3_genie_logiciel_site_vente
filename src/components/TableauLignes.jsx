import { montant } from '../utils/format';

/** Lignes en lecture seule (récapitulatif, détail de commande, historique). */
export default function TableauLignes({ lignes }) {
  return (
    <table className="tableau">
      <thead>
        <tr><th>Produit</th><th className="num">Prix unitaire</th><th className="num">Quantité</th><th className="num">Sous-total</th></tr>
      </thead>
      <tbody>
        {lignes.map((l) => (
          <tr key={l.produitId}>
            <td className="tableau__produit"><img src={l.imageUrl} alt="" /> {l.nom}</td>
            <td className="num">{montant(l.prixUnitaire)}</td>
            <td className="num">{l.quantite}</td>
            <td className="num">{montant(l.sousTotal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
