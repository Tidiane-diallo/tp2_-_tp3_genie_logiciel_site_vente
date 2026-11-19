// Futur : ClientsController  ->  POST /api/clients, GET/PUT /api/clients/moi, /api/clients/moi/adresses
import { client, adresses } from '../mocks/donnees';
import { scenario } from '../mocks/scenario';
import { repondre, echouer } from './apiSimulee';

export const inscrire = (_inscriptionDto) =>
  scenario() === 'courriel'
    ? echouer('CourrielDejaUtilise', 'Cette adresse courriel est déjà associée à un compte.')
    : repondre(client);

export const getProfil = () => repondre(client);
export const modifierProfil = (dto) => repondre({ ...client, ...dto });

export const getAdresses = () => repondre(adresses);
export const ajouterAdresse = (dto) => repondre({ id: 99, ...dto });
export const modifierAdresse = (id, dto) => repondre({ id, ...dto });
export const supprimerAdresse = (_id) => repondre(null);
export const definirAdressePrincipale = (id) => repondre({ id, estPrincipale: true });
