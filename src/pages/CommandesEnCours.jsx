// P12 — Commandes en cours : numéro, date, montant total, état actuel
import { Link } from 'react-router-dom';
import Chargement from '../components/Chargement';
import EspaceCompte from '../components/NavCompte';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';
import Alerte from '../components/Alerte';
import { BadgeEtat } from '../components/BadgeEtat';
import { useCommandesEnCours } from '../hooks/useCommandes';
import { montant, date } from '../utils/format';

export function TableauCommandes({ commandes, colonneRemboursement = false }) {
  return (
    <table className="tableau tableau--commandes">
      <thead>
        <tr>
          <th>Commande</th><th>Date</th><th className="num">Montant total</th><th>État</th>
          {colonneRemboursement && <th>Remboursement</th>}
          <th><span className="sr">Détail</span></th>
        </tr>
      </thead>
      <tbody>
        {commandes.map((c) => (
          <tr key={c.numero} className={c.actionRequise ? 'ligne--action' : ''}>
            <td><strong>{c.numero}</strong></td>
            <td data-libelle="Date">{date(c.date)}</td>
            <td className="num" data-libelle="Montant">{montant(c.montantTotal)}</td>
            <td data-libelle="État"><BadgeEtat etat={c.etat} />{c.actionRequise && <span className="badge badge--action">Action requise</span>}</td>
            {colonneRemboursement && <td data-libelle="Remboursement">{c.remboursement ? montant(c.remboursement.montant) : '—'}</td>}
            <td className="num"><Link to={`/commandes/${c.numero}`} className="btn btn--secondaire btn--petit" aria-label={`Voir le détail de la commande ${c.numero}`}>Voir le détail</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function CommandesEnCours() {
  const commandes = useCommandesEnCours();
  useTitre('Mes commandes');
  return (
    <EspaceCompte titre="Mes commandes en cours" intro="Commandes confirmées qui ne sont pas encore livrées. Les commandes livrées ou annulées sont dans l’historique.">
      <Chargement etat={commandes}>
        {(liste) => (
          <>
            {liste.some((c) => c.actionRequise) && (
              <Alerte type="avertissement" titre="Une commande attend votre choix">
                Un produit commandé ne peut pas être fourni. Indiquez votre choix dans les 24 heures,
                sinon la commande sera annulée et remboursée.
              </Alerte>
            )}
            {liste.length === 0
              ? <div className="vide carte"><Icone nom="colis" taille={40} className="vide__icone" /><h2>Aucune commande en cours</h2><p>Vos prochaines commandes apparaîtront ici dès leur confirmation.</p><Link to="/catalogue" className="btn btn--primaire">Découvrir le catalogue</Link></div>
              : <div className="carte"><TableauCommandes commandes={liste} /></div>}
          </>
        )}
      </Chargement>
    </EspaceCompte>
  );
}
