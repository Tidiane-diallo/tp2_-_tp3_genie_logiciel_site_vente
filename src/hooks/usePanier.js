// ViewModel « Panier »
import useChargement from './useChargement';
import * as panierService from '../services/panierService';

export const usePanier = () => useChargement(() => panierService.getPanier(), []);
