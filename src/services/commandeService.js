// Futur : CommandesController
//   GET  /api/livraison/modes
//   POST /api/commandes/verification-stock      (409 si stock insuffisant)
//   GET  /api/commandes/recapitulatif
//   GET  /api/commandes?statut=en-cours | ?statut=terminees
//   GET  /api/commandes/{numero}
//   POST /api/commandes/{numero}/choix-indisponibles   -> transmis au processus BPMN (TP1)
import {
  commandes, modesLivraison, construireRecapitulatif, verificationStockEchec, versResume, EtatCommande,
} from '../mocks/donnees';
import { scenario } from '../mocks/scenario';
import { repondre, echouer } from './apiSimulee';

const EN_COURS = [EtatCommande.Confirmee, EtatCommande.EnPreparation, EtatCommande.Expediee];

export const getModesLivraison = () => repondre(modesLivraison);

export const verifierStock = () =>
  scenario() === 'stock'
    ? echouer('StockInsuffisant', 'Certains produits ne sont plus disponibles dans les quantités demandées.',
        verificationStockEchec.produitsInsuffisants)
    : repondre({ estValide: true, produitsInsuffisants: [] });

export const getRecapitulatif = (codeMode = 'Standard', adresseId = 1) =>
  repondre(construireRecapitulatif(codeMode, Number(adresseId)));

export const getCommandesEnCours = () =>
  repondre(commandes.filter((c) => EN_COURS.includes(c.etat)).map(versResume));

export const getHistorique = () =>
  repondre(commandes.filter((c) => !EN_COURS.includes(c.etat)).map(versResume));

export const getCommande = (numero) => {
  const c = commandes.find((x) => x.numero === numero);
  return c ? repondre(c) : echouer('CommandeIntrouvable', 'Cette commande est introuvable.');
};

/** choix : 'LivraisonPartielle' | 'AnnulationComplete' */
export const transmettreChoixIndisponibles = (numero, choix) => repondre({ numero, choix, enregistre: true });
