// P6 — Fiche détaillée d'un produit, choix de la quantité, ajout au panier
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import Alerte from '../components/Alerte';
import Quantite from '../components/Quantite';
import Icone from '../components/Icone';
import { BadgeDisponibilite } from '../components/BadgeEtat';
import { useProduit, useCategories } from '../hooks/useProduits';
import useTitre from '../hooks/useTitre';
import * as panierService from '../services/panierService';
import { montant } from '../utils/format';

export default function DetailProduit() {
  const { id } = useParams();
  const produit = useProduit(id);
  const categories = useCategories();
  const [quantite, setQuantite] = useState(1);
  const [ajoute, setAjoute] = useState(false);
  useTitre(produit.donnees?.nom ?? 'Produit');

  const ajouter = async (p) => {
    await panierService.ajouterProduit(p.id, quantite);
    setAjoute(true);
  };

  return (
    <Chargement etat={produit}>
      {(p) => {
        const categorie = categories.donnees?.find((c) => c.id === p.categorieId);
        const epuise = p.disponibilite === 'Rupture';
        return (
          <>
            <nav className="fil" aria-label="Fil d’Ariane">
              <Link to="/catalogue">Catalogue</Link> <span aria-hidden="true">/</span>{' '}
              {categorie && <><Link to={`/catalogue?categorie=${categorie.id}`}>{categorie.nom}</Link> <span aria-hidden="true">/</span> </>}
              <span aria-current="page">{p.nom}</span>
            </nav>
            <article className="fiche">
              <div className="fiche__image"><img src={p.imageUrl} alt={p.nom} /></div>
              <div className="fiche__infos">
                {categorie && <span className="fiche__categorie">{categorie.nom}</span>}
                <h1>{p.nom}</h1>
                <p className="prix prix--grand">{montant(p.prix)}</p>
                <BadgeDisponibilite disponibilite={p.disponibilite} quantite={p.quantiteDisponible} />
                <p className="fiche__description">{p.description}</p>

                {ajoute && (
                  <Alerte type="succes" titre="Produit ajouté au panier">
                    {quantite} × {p.nom}. <Link to="/panier">Voir mon panier</Link> ou{' '}
                    <Link to="/catalogue">continuer mes achats</Link>.
                  </Alerte>
                )}

                <div className="fiche__achat">
                  <label htmlFor="qte">Quantité</label>
                  <Quantite id="qte" valeur={1} max={p.quantiteDisponible || 1} desactive={epuise}
                    onChange={(n) => { setQuantite(n); setAjoute(false); }} />
                  <button className="btn btn--primaire btn--grand" disabled={epuise} onClick={() => ajouter(p)}>
                    <Icone nom="panier" /> {epuise ? 'Indisponible' : 'Ajouter au panier'}
                  </button>
                </div>
                {epuise && <p className="petit">Ce produit est en rupture de stock. Revenez bientôt.</p>}

                <ul className="fiche__garanties">
                  <li><Icone nom="camion" /> <span><strong>Livraison standard 8 $</strong> 3 à 5 jours ouvrables</span></li>
                  <li><Icone nom="horloge" /> <span><strong>Livraison express 15 $</strong> 1 à 2 jours ouvrables</span></li>
                  <li><Icone nom="cadenas" /> <span><strong>Paiement sécurisé</strong> Carte de crédit ou de débit</span></li>
                </ul>
                <Link to="/catalogue" className="lien-retour"><Icone nom="retour" taille={16} /> Retour au catalogue</Link>
              </div>
            </article>
          </>
        );
      }}
    </Chargement>
  );
}
