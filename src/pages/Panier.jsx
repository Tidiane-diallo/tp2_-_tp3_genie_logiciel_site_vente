// P7 — Panier : quantités, prix unitaire, sous-totaux, taxes, total avant livraison
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chargement from '../components/Chargement';
import ResumeMontants from '../components/ResumeMontants';
import Alerte from '../components/Alerte';
import EtapesCommande from '../components/EtapesCommande';
import Quantite from '../components/Quantite';
import Icone from '../components/Icone';
import { usePanier } from '../hooks/usePanier';
import useTitre from '../hooks/useTitre';
import * as panierService from '../services/panierService';
import { montant } from '../utils/format';

export default function Panier() {
  const panier = usePanier();
  const { state, search } = useLocation();
  const naviguer = useNavigate();
  const vide = new URLSearchParams(search).get('etat') === 'vide';
  const insuffisants = state?.stockInsuffisant ?? [];
  useTitre('Mon panier');

  return (
    <section>
      <EtapesCommande courante={0} />
      <h1>Mon panier</h1>

      {insuffisants.length > 0 && (
        <Alerte type="erreur" titre="Certains produits ne sont plus disponibles dans les quantités demandées">
          <ul>
            {insuffisants.map((x) => (
              <li key={x.produitId}>{x.nom} : {x.quantiteDemandee} demandé(s), {x.quantiteDisponible} disponible(s)</li>
            ))}
          </ul>
          Modifiez votre panier pour poursuivre la commande.
        </Alerte>
      )}

      <Chargement etat={panier}>
        {(p) => (vide || p.lignes.length === 0) ? (
          <div className="vide carte">
            <Icone nom="panier" taille={40} className="vide__icone" />
            <h2>Votre panier est vide</h2>
            <p>Parcourez le catalogue et ajoutez les produits qui vous intéressent.</p>
            <Link to="/catalogue" className="btn btn--primaire">Découvrir le catalogue</Link>
          </div>
        ) : (
          <div className="disposition-panier">
            <div className="carte">
              <table className="tableau tableau--panier">
                <caption className="sr">Produits de votre panier</caption>
                <thead>
                  <tr><th>Produit</th><th className="num">Prix unitaire</th><th>Quantité</th><th className="num">Sous-total</th><th><span className="sr">Actions</span></th></tr>
                </thead>
                <tbody>
                  {p.lignes.map((l) => {
                    const manque = insuffisants.find((x) => x.produitId === l.produitId);
                    return (
                      <tr key={l.produitId} className={manque ? 'ligne--alerte' : ''}>
                        <td className="tableau__produit">
                          <img src={l.imageUrl} alt="" />
                          <span>
                            <Link to={`/produits/${l.produitId}`}>{l.nom}</Link>
                            {manque && <small className="champ__erreur">Disponible : {manque.quantiteDisponible}</small>}
                          </span>
                        </td>
                        <td className="num" data-libelle="Prix unitaire">{montant(l.prixUnitaire)}</td>
                        <td data-libelle="Quantité">
                          <Quantite valeur={l.quantite} libelle={l.nom}
                            onChange={(n) => panierService.modifierQuantite(l.produitId, n)} />
                        </td>
                        <td className="num" data-libelle="Sous-total"><strong>{montant(l.sousTotal)}</strong></td>
                        <td className="num">
                          <button className="btn btn--icone" onClick={() => panierService.retirerProduit(l.produitId)}
                            aria-label={`Retirer ${l.nom} du panier`} title="Retirer du panier">
                            <Icone nom="poubelle" taille={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="actions actions--entre">
                <Link to="/catalogue" className="btn btn--tertiaire"><Icone nom="retour" taille={16} /> Continuer mes achats</Link>
                <button className="btn btn--danger-contour" onClick={() => naviguer('/panier?etat=vide')}>Vider le panier</button>
              </div>
            </div>

            <aside className="carte resume">
              <h2>Résumé</h2>
              <ResumeMontants sousTotal={p.sousTotal} taxes={p.taxes} total={p.totalAvantLivraison}
                libelleTotal="Total avant livraison" />
              <p className="petit">Les frais de livraison (standard 8 $ ou express 15 $) s’ajoutent à l’étape suivante.</p>
              <Link to="/commande/livraison" className="btn btn--primaire btn--bloc btn--grand">Passer la commande</Link>
              <p className="resume__note"><Icone nom="cadenas" taille={16} /> Connexion requise pour commander. Votre panier est conservé.</p>
            </aside>
          </div>
        )}
      </Chargement>
    </section>
  );
}
