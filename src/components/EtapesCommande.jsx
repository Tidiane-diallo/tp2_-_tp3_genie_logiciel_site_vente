import { Link } from 'react-router-dom';
import Icone from './Icone';

const ETAPES = [
  ['Panier', '/panier'],
  ['Adresse et livraison', '/commande/livraison'],
  ['Récapitulatif', null],
  ['Paiement', null],
  ['Confirmation', null],
];

/**
 * Fil d'Ariane du passage de commande : le client sait toujours où il en est.
 * Les étapes déjà franchies sont cliquables, sauf après la confirmation (commande payée).
 */
export default function EtapesCommande({ courante }) {
  return (
    <ol className="etapes" aria-label="Étapes de la commande">
      {ETAPES.map(([nom, lien], i) => {
        const faite = i < courante;
        const contenu = <><span className="etapes__num">{faite ? <Icone nom="crochet" taille={14} /> : i + 1}</span><span className="etapes__nom">{nom}</span></>;
        return (
          <li key={nom} className={faite ? 'faite' : i === courante ? 'courante' : ''}
            aria-current={i === courante ? 'step' : undefined}>
            {faite && lien && courante < 4 ? <Link to={lien}>{contenu}</Link> : <span>{contenu}</span>}
          </li>
        );
      })}
    </ol>
  );
}
