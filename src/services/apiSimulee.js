/**
 * Point unique d'accès « réseau » du prototype.
 * TP2 : renvoie des données fictives après un court délai.
 * TP3 : remplacer le corps de ces deux fonctions par fetch() vers Commerce.Api.
 *       Les services et les pages n'ont pas à changer.
 */
export class ApiErreur extends Error {
  constructor(code, message, details = null) {
    super(message);
    this.code = code;       // ex. 'PaiementRefuse' -> HTTP 402 au TP3
    this.details = details; // ex. liste des produits en stock insuffisant -> HTTP 409
  }
}

const copie = (v) => (v === undefined ? v : structuredClone(v));

export const repondre = (donnees, delai = 150) =>
  new Promise((resolve) => setTimeout(() => resolve(copie(donnees)), delai));

export const echouer = (code, message, details, delai = 150) =>
  new Promise((_, reject) => setTimeout(() => reject(new ApiErreur(code, message, details)), delai));
