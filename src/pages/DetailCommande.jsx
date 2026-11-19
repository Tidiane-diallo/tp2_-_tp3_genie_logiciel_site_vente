// P13 — Détail d'une commande (en cours ou terminée) : état, suivi, produits, montants, remboursement
import { Link, useParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import Alerte from '../components/Alerte';
import { BadgeEtat } from '../components/BadgeEtat';
import TableauLignes from '../components/TableauLignes';
import BlocAdresse from '../components/BlocAdresse';
import ResumeMontants from '../components/ResumeMontants';
import { useCommande } from '../hooks/useCommandes';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';
import { montant, date, libellesEtat } from '../utils/format';

const PROGRESSION = ['Confirmee', 'EnPreparation', 'Expediee', 'Livree'];
const TERMINEES = ['Livree', 'Annulee'];

function Progression({ etat }) {
  if (etat === 'Annulee') return <Alerte type="neutre" titre="Commande annulée">Cette commande a été annulée.</Alerte>;
  const rang = PROGRESSION.indexOf(etat);
  return (
    <ol className="progression" aria-label="Avancement de la commande">
      {PROGRESSION.map((e, i) => (
        <li key={e} className={i < rang ? 'faite' : i === rang ? 'courante' : ''} aria-current={i === rang ? 'step' : undefined}>
          <span className="progression__point">{i < rang && <Icone nom="crochet" taille={12} />}</span>{libellesEtat[e]}
        </li>
      ))}
    </ol>
  );
}

export default function DetailCommande() {
  const { numero } = useParams();
  const commande = useCommande(numero);
  useTitre(`Commande ${numero}`);

  return (
    <Chargement etat={commande}>
      {(c) => {
        const terminee = TERMINEES.includes(c.etat);
        return (
          <section>
            <nav className="fil" aria-label="Fil d’Ariane">
              <Link to={terminee ? '/historique' : '/commandes'}>{terminee ? 'Historique' : 'Mes commandes'}</Link> <span aria-hidden="true">/</span> <span aria-current="page">{c.numero}</span>
            </nav>
            <div className="titre-ligne">
              <h1>Commande {c.numero}</h1>
              <BadgeEtat etat={c.etat} />
            </div>
            <p className="intro">Passée le {date(c.date)}</p>

            {c.actionRequise && (
              <Alerte type="avertissement" titre="Votre choix est requis">
                Un ou plusieurs produits ne peuvent pas être fournis. Sans réponse avant le {date(c.dateLimiteReponse)},
                la commande sera annulée et entièrement remboursée.{' '}
                <Link to={`/commandes/${c.numero}/indisponibles`} className="btn btn--primaire btn--petit">Indiquer mon choix</Link>
              </Alerte>
            )}

            <div className="carte carte--progression"><Progression etat={c.etat} /></div>

            <div className="disposition-panier">
              <div>
                <div className="carte">
                  <h2><Icone nom="camion" /> Suivi de la livraison</h2>
                  {c.numeroSuivi ? (
                    <dl className="infos-suivi">
                      <div><dt>Numéro de suivi</dt><dd><strong>{c.numeroSuivi}</strong></dd></div>
                      <div><dt>{c.etat === 'Livree' ? 'Livrée le' : 'Date de livraison prévue'}</dt><dd><strong>{date(c.dateLivraisonPrevue)}</strong></dd></div>
                    </dl>
                  ) : (
                    <p className="petit">
                      {c.etat === 'Annulee' ? 'Aucune livraison pour cette commande.'
                        : 'Le numéro de suivi et la date de livraison prévue s’afficheront dès que l’entreprise de livraison les aura fournis.'}
                    </p>
                  )}
                </div>
                <div className="carte"><h2>Produits commandés</h2><TableauLignes lignes={c.lignes} /></div>
                <div className="deux-colonnes">
                  <div className="carte"><h2>Adresse de livraison</h2><BlocAdresse adresse={c.adresse} /></div>
                  <div className="carte"><h2>Mode de livraison</h2><p><strong>{c.modeLivraison.libelle}</strong><br />{c.modeLivraison.delai}</p></div>
                </div>
              </div>
              <aside>
                <div className="carte resume">
                  <h2>Paiement</h2>
                  <ResumeMontants sousTotal={c.sousTotal} taxes={c.taxes} fraisLivraison={c.fraisLivraison}
                    total={c.montantPaye} libelleTotal="Montant payé" />
                </div>
                {c.remboursement && (
                  <div className="carte resume carte--rembourse">
                    <h2>Remboursement</h2>
                    <p className="prix prix--grand">{montant(c.remboursement.montant)}</p>
                    <p><span className={`badge badge--${c.remboursement.etat}`}>
                      {c.remboursement.etat === 'Effectue' ? 'Effectué' : 'En cours'}</span></p>
                    <p className="petit">{c.remboursement.motif}</p>
                  </div>
                )}
              </aside>
            </div>
          </section>
        );
      }}
    </Chargement>
  );
}
