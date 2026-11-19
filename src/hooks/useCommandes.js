// ViewModel « Commandes »
import useChargement from './useChargement';
import * as commandeService from '../services/commandeService';

export const useModesLivraison = () => useChargement(() => commandeService.getModesLivraison(), []);
export const useRecapitulatif = (mode, adresseId) =>
  useChargement(() => commandeService.getRecapitulatif(mode, adresseId), [mode, adresseId]);
export const useCommandesEnCours = () => useChargement(() => commandeService.getCommandesEnCours(), []);
export const useHistorique = () => useChargement(() => commandeService.getHistorique(), []);
export const useCommande = (numero) => useChargement(() => commandeService.getCommande(numero), [numero]);
