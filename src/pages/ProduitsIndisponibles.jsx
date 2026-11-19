// P14 — Traitement d'un produit devenu indisponible : livraison partielle ou annulation complète
// Le choix est transmis au processus « Traitement d'une commande » (TP1, Event-Based Gateway, délai 24 h).
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import Alerte from '../components/Alerte';
import { useCommande } from '../hooks/useCommandes';
import * as commandeService from '../services/commandeService';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';
import { montant, date } from '../utils/format';

export default function ProduitsIndisponibles() {
  const { numero } = useParams();
  const commande = useCommande(numero);
  const [choix, setChoix] = useState(null);
  const [transmis, setTransmis] = useState(null);
  useTitre(`Produits indisponibles, commande ${numero}`);

  const confirmer = async (e) => {
    e.preventDefault();
    setTransmis(await commandeService.transmettreChoixIndisponibles(numero, choix));
  };

  return (
    <Chargement etat={commande}>
      {(c) => {
        if (!c.actionRequise) {
          return <Alerte type="info" titre="Aucune action requise">Cette commande ne nécessite aucun choix de votre part. <Link to={`/commandes/${c.numero}`}>Voir la commande</Link></Alerte>;
        }
        const remboursementPartiel = c.montantRemboursementPartiel; // fourni par le DTO, aucun calcul ici

        if (transmis) {
          return (
            <section className="carte confirmation page-etroite">
              <div className="confirmation__icone"><Icone nom="crochet" taille={34} /></div>
              <h1>Votre choix a été transmis</h1>
              <p>{transmis.choix === 'LivraisonPartielle'
                ? `Les produits disponibles seront expédiés. Un remboursement de ${montant(remboursementPartiel)} sera effectué.`
                : `Votre commande sera annulée et un remboursement de ${montant(c.montantPaye)} sera effectué.`}</p>
              <p className="petit">Vous serez informé par courriel dès que le remboursement sera effectué.</p>
              <Link to={`/commandes/${c.numero}`} className="btn btn--primaire">Retour à la commande</Link>
            </section>
          );
        }

        return (
          <section className="page-etroite">
            <nav className="fil" aria-label="Fil d’Ariane">
              <Link to="/commandes">Mes commandes</Link> <span aria-hidden="true">/</span> <Link to={`/commandes/${c.numero}`}>{c.numero}</Link> <span aria-hidden="true">/</span> <span aria-current="page">Produits indisponibles</span>
            </nav>
            <h1>Produits indisponibles dans la commande {c.numero}</h1>
            <Alerte type="avertissement" titre="Votre réponse est attendue sous 24 heures">
              Sans réponse avant le <strong>{date(c.dateLimiteReponse)}</strong> (24 heures), votre commande sera
              automatiquement annulée et entièrement remboursée.
            </Alerte>

            <div className="carte">
              <h2>Produits qui ne peuvent pas être fournis</h2>
              <ul className="liste-indispo">
                {c.produitsIndisponibles.map((x) => (
                  <li key={x.produitId}><span><Icone nom="erreur" taille={18} /> {x.quantite} × {x.nom}</span><strong>{montant(x.montant)}</strong></li>
                ))}
              </ul>
            </div>

            <form className="carte" onSubmit={confirmer}>
              <fieldset>
                <legend>Que souhaitez-vous faire ?</legend>
                <div className="choix-liste">
                  <label className={`choix ${choix === 'LivraisonPartielle' ? 'choix--actif' : ''}`}>
                    <input type="radio" name="choix" value="LivraisonPartielle" onChange={(e) => setChoix(e.target.value)} />
                    <span className="choix__texte">
                      <strong>Recevoir les autres produits</strong>
                      <span>Les produits disponibles sont expédiés ; les produits manquants sont remboursés.</span>
                    </span>
                    <strong className="choix__prix">Remboursement {montant(remboursementPartiel)}</strong>
                  </label>
                  <label className={`choix ${choix === 'AnnulationComplete' ? 'choix--actif' : ''}`}>
                    <input type="radio" name="choix" value="AnnulationComplete" onChange={(e) => setChoix(e.target.value)} />
                    <span className="choix__texte">
                      <strong>Annuler toute la commande</strong>
                      <span>Aucun produit n’est expédié ; le montant payé est entièrement remboursé.</span>
                    </span>
                    <strong className="choix__prix">Remboursement {montant(c.montantPaye)}</strong>
                  </label>
                </div>
              </fieldset>
              <div className="actions actions--entre">
                <Link to={`/commandes/${c.numero}`} className="btn btn--tertiaire"><Icone nom="retour" taille={16} /> Retour à la commande</Link>
                <button className="btn btn--primaire" disabled={!choix}>Confirmer mon choix</button>
              </div>
            </form>
          </section>
        );
      }}
    </Chargement>
  );
}
