// P15 — Historique des commandes terminées (livrées ou annulées), avec remboursement s'il y a lieu
import Chargement from '../components/Chargement';
import EspaceCompte from '../components/NavCompte';
import useTitre from '../hooks/useTitre';
import { TableauCommandes } from './CommandesEnCours';
import { useHistorique } from '../hooks/useCommandes';

export default function Historique() {
  const historique = useHistorique();
  useTitre('Historique des commandes');
  return (
    <EspaceCompte titre="Historique de mes commandes"
      intro="Commandes livrées ou annulées. Ouvrez une commande pour voir les produits, le montant payé, la livraison, l’état final et le remboursement.">
      <Chargement etat={historique}>
        {(liste) => <div className="carte"><TableauCommandes commandes={liste} colonneRemboursement /></div>}
      </Chargement>
    </EspaceCompte>
  );
}
