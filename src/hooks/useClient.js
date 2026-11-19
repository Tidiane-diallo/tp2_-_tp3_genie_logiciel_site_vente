// ViewModel « Compte client »
import useChargement from './useChargement';
import * as clientService from '../services/clientService';

export const useProfil = () => useChargement(() => clientService.getProfil(), []);
export const useAdresses = () => useChargement(() => clientService.getAdresses(), []);
