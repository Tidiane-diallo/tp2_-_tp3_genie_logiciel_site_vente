// P9 — Récapitulatif : produits, quantités, prix, adresse, mode, taxes, frais, total à payer
import { Link, useSearchParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import EtapesCommande from '../components/EtapesCommande';
import TableauLignes from '../components/TableauLignes';
import BlocAdresse from '../components/BlocAdresse';
import ResumeMontants from '../components/ResumeMontants';
import { useRecapitulatif } from '../hooks/useCommandes';
import useTitre from '../hooks/useTitre';
import Icone from '../components/Icone';
import { montant } from '../utils/format';

export default function Recapitulatif() {
  const [params] = useSearchParams();
  const mode = params.get('mode') ?? 'Standard';
  const adresseId = params.get('adresse') ?? 1;
  const recap = useRecapitulatif(mode, adresseId);
  useTitre('Récapitulatif de la commande');

  return (
    <section>
      <EtapesCommande courante={2} />
      <h1>Récapitulatif de la commande</h1>
      <Chargement etat={recap}>
        {(r) => (
          <div className="disposition-panier">
            <div>
              <div className="carte">
                <div className="titre-ligne"><h2>Produits</h2><Link to="/panier" className="lien-petit">Modifier le panier</Link></div>
                <TableauLignes lignes={r.lignes} />
              </div>
              <div className="deux-colonnes">
                <div className="carte">
                  <div className="titre-ligne"><h2>Adresse de livraison</h2><Link to="/commande/livraison" className="lien-petit">Modifier</Link></div>
                  <BlocAdresse adresse={r.adresse} />
                </div>
                <div className="carte">
                  <div className="titre-ligne"><h2>Mode de livraison</h2><Link to="/commande/livraison" className="lien-petit">Modifier</Link></div>
                  <p><strong>{r.modeLivraison.libelle}</strong> ({montant(r.modeLivraison.frais)})<br />{r.modeLivraison.delai}</p>
                </div>
              </div>
            </div>
            <aside className="carte resume">
              <h2>Total à payer</h2>
              <ResumeMontants sousTotal={r.sousTotal} taxes={r.taxes} fraisLivraison={r.fraisLivraison}
                total={r.total} libelleTotal="Total à payer" />
              <Link to={`/commande/paiement?mode=${mode}&adresse=${adresseId}`} className="btn btn--primaire btn--bloc btn--grand">
                <Icone nom="cadenas" taille={18} /> Procéder au paiement
              </Link>
              <Link to="/commande/livraison" className="btn btn--tertiaire btn--bloc"><Icone nom="retour" taille={16} /> Adresse et livraison</Link>
            </aside>
          </div>
        )}
      </Chargement>
    </section>
  );
}
