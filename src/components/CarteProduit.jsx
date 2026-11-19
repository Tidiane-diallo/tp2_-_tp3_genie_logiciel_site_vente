import { Link } from 'react-router-dom';
import { montant } from '../utils/format';
import { BadgeDisponibilite } from './BadgeEtat';

/** Toute la carte est cliquable (lien étiré sur le titre) : un seul lien par produit pour le clavier. */
export default function CarteProduit({ produit }) {
  return (
    <article className={`carte-produit ${produit.disponibilite === 'Rupture' ? 'carte-produit--epuise' : ''}`}>
      <div className="carte-produit__image">
        <img src={produit.imageUrl} alt="" loading="lazy" />
      </div>
      <div className="carte-produit__corps">
        <div className="carte-produit__titre">
          <h3><Link to={`/produits/${produit.id}`} className="lien-etire">{produit.nom}</Link></h3>
          <span className="prix">{montant(produit.prix)}</span>
        </div>
        <p className="carte-produit__description">{produit.description}</p>
        <div className="carte-produit__bas">
          <BadgeDisponibilite disponibilite={produit.disponibilite} quantite={produit.quantiteDisponible} />
          <span className="carte-produit__voir" aria-hidden="true">Voir le produit →</span>
        </div>
      </div>
    </article>
  );
}
