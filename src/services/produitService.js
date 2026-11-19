// Futur : ProduitsController  ->  GET /api/produits, GET /api/produits/{id}, GET /api/categories
import { produits, categories } from '../mocks/donnees';
import { repondre, echouer } from './apiSimulee';

export const getCategories = () => repondre(categories);

export const getProduits = ({ motCle = '', categorieId = null } = {}) => {
  const mot = motCle.trim().toLowerCase();
  const resultat = produits.filter(
    (p) =>
      (!categorieId || p.categorieId === Number(categorieId)) &&
      (!mot || p.nom.toLowerCase().includes(mot) || p.description.toLowerCase().includes(mot)),
  );
  return repondre(resultat);
};

export const getProduit = (id) => {
  const produit = produits.find((p) => p.id === Number(id));
  return produit ? repondre(produit) : echouer('ProduitIntrouvable', 'Ce produit n’existe pas.');
};
