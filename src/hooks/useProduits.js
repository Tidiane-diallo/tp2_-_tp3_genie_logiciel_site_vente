// ViewModel « Produits » : la page ne connaît que ce hook.
import useChargement from './useChargement';
import * as produitService from '../services/produitService';

export const useCategories = () => useChargement(() => produitService.getCategories(), []);

export const useCatalogue = (motCle, categorieId) =>
  useChargement(() => produitService.getProduits({ motCle, categorieId }), [motCle, categorieId]);

export const useProduit = (id) => useChargement(() => produitService.getProduit(id), [id]);
