// Futur : PaiementsController -> POST /api/commandes/paiement
// Le back-end appelle IServicePaiement (participant « Service de paiement » du TP1).
// 402 si refusé ; sinon la commande reçoit un numéro unique (ConfirmationCommandeDto).
import { commandes, client } from '../mocks/donnees';
import { scenario } from '../mocks/scenario';
import { repondre, echouer } from './apiSimulee';

export const payer = (_paiementDto) => {
  if (scenario() === 'refuse') {
    return echouer('PaiementRefuse', 'Le paiement a été refusé par votre institution financière.');
  }
  const c = commandes[0];
  return repondre({
    numero: c.numero,
    montantPaye: c.montantPaye,
    adresse: c.adresse,
    modeLivraison: c.modeLivraison,
    courrielConfirmation: client.courriel,
  });
};
