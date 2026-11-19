// P11 — Confirmation : numéro unique, montant payé, informations de livraison, courriel envoyé
import { Link, useParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import EtapesCommande from '../components/EtapesCommande';
import BlocAdresse from '../components/BlocAdresse';
import { useCommande } from '../hooks/useCommandes';
import { useSession } from '../contexte/SessionContexte';
import useTitre from '../hooks/useTitre';
import Icone from '../components/Icone';
import { montant } from '../utils/format';

export default function Confirmation() {
  const { numero } = useParams();
  const commande = useCommande(numero);
  const { client } = useSession();
  useTitre('Commande confirmée');

  return (
    <section>
      <EtapesCommande courante={4} />
      <Chargement etat={commande}>
        {(c) => (
          <div className="carte confirmation">
            <div className="confirmation__icone"><Icone nom="crochet" taille={34} /></div>
            <h1>Merci, votre commande est confirmée !</h1>
            <p className="intro">Un courriel de confirmation a été envoyé à <strong>{client?.courriel}</strong>.</p>
            <dl className="confirmation__infos">
              <div><dt>Numéro de commande</dt><dd className="gros">{c.numero}</dd></div>
              <div><dt>Montant payé</dt><dd className="gros">{montant(c.montantPaye)}</dd></div>
              <div><dt>Livraison</dt><dd>{c.modeLivraison.libelle} ({c.modeLivraison.delai})</dd></div>
              <div><dt>Adresse</dt><dd><BlocAdresse adresse={c.adresse} /></dd></div>
            </dl>
            <p className="petit">Vous serez informé de chaque étape : préparation, expédition et livraison.</p>
            <div className="actions actions--centre">
              <Link to={`/commandes/${c.numero}`} className="btn btn--primaire">Suivre ma commande</Link>
              <Link to="/catalogue" className="btn btn--secondaire">Continuer mes achats</Link>
            </div>
          </div>
        )}
      </Chargement>
    </section>
  );
}
