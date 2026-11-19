// Futur : PanierController  ->  GET /api/panier, POST/PUT/DELETE /api/panier/lignes
// Prototype statique : les modifications renvoient le même panier fictif.
import { panier } from '../mocks/donnees';
import { repondre } from './apiSimulee';

export const getPanier = () => repondre(panier);
export const ajouterProduit = (_produitId, _quantite) => repondre(panier);
export const modifierQuantite = (_produitId, _quantite) => repondre(panier);
export const retirerProduit = (_produitId) => repondre(panier);
export const viderPanier = () => repondre({ ...panier, lignes: [], nombreArticles: 0 });
