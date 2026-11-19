// Futur : AuthController  ->  POST /api/auth/connexion (jeton JWT au TP3)
import { client } from '../mocks/donnees';
import { scenario } from '../mocks/scenario';
import { repondre, echouer } from './apiSimulee';

export const connecter = (_courriel, _motDePasse) =>
  scenario() === 'erreur'
    ? echouer('IdentifiantsInvalides', 'Courriel ou mot de passe incorrect.')
    : repondre({ client, jeton: 'jeton-fictif' });

export const deconnecter = () => repondre(null);
