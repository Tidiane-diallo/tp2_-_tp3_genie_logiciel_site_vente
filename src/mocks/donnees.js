/**
 * DONNÉES FICTIVES DU PROTOTYPE (TP2)
 * ------------------------------------------------------------
 * Chaque objet a EXACTEMENT la forme des DTO que renverra
 * l'API ASP.NET au TP3 (projet Commerce.Api).
 * Les montants sont calculés ici pour simuler le serveur :
 * au TP3, ces calculs seront faits dans Commerce.Domain,
 * jamais dans les composants React.
 * Ce dossier disparaîtra au TP3.
 */

// ---------- Énumérations (miroir des enums C#) ----------
export const EtatCommande = {
  Confirmee: 'Confirmee',
  EnPreparation: 'EnPreparation',
  Expediee: 'Expediee',
  Livree: 'Livree',
  Annulee: 'Annulee',
};

export const Disponibilite = {
  EnStock: 'EnStock',
  StockLimite: 'StockLimite',
  Rupture: 'Rupture',
};

export const EtatRemboursement = {
  EnCours: 'EnCours',
  Effectue: 'Effectue',
};

// ---------- Simulation des calculs serveur ----------
const TPS = 0.05;
const TVQ = 0.09975;
const arrondir = (n) => Math.round(n * 100) / 100;

const calculerMontants = (lignes, fraisLivraison = 0) => {
  const sousTotal = arrondir(lignes.reduce((s, l) => s + l.sousTotal, 0));
  const tps = arrondir(sousTotal * TPS);
  const tvq = arrondir(sousTotal * TVQ);
  const totalAvantLivraison = arrondir(sousTotal + tps + tvq);
  return {
    sousTotal,
    taxes: { tps, tvq, total: arrondir(tps + tvq) },
    totalAvantLivraison,
    fraisLivraison,
    total: arrondir(totalAvantLivraison + fraisLivraison),
  };
};

const ligne = (produit, quantite) => ({
  produitId: produit.id,
  nom: produit.nom,
  imageUrl: produit.imageUrl,
  prixUnitaire: produit.prix,
  quantite,
  sousTotal: arrondir(produit.prix * quantite),
});

// Photos : Unsplash (licence libre), copiées dans public/images pour fonctionner hors ligne.
const IMG = `${import.meta.env.BASE_URL}images/`;

// ---------- CategorieDto[] ----------
export const categories = [
  { id: 1, nom: 'Électronique' },
  { id: 2, nom: 'Maison' },
  { id: 3, nom: 'Sport' },
  { id: 4, nom: 'Livres' },
];

// ---------- ProduitDto[] ----------
export const produits = [
  { id: 1, nom: 'Casque sans fil Pulse', categorieId: 1, prix: 89.99, imageUrl: IMG + 'ecouteurs.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 42,
    description: 'Casque Bluetooth à réduction de bruit active, 30 h d’autonomie, pliable avec étui de transport.' },
  { id: 2, nom: 'Montre connectée Orbit', categorieId: 1, prix: 199.99, imageUrl: IMG + 'montre.jpg',
    disponibilite: Disponibilite.StockLimite, quantiteDisponible: 3,
    description: 'Suivi de l’activité et du sommeil, GPS intégré, étanche jusqu’à 50 m.' },
  { id: 3, nom: 'Clavier mécanique K7', categorieId: 1, prix: 129.99, imageUrl: IMG + 'clavier.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 18,
    description: 'Clavier mécanique rétroéclairé, disposition canadienne-française, touches remplaçables.' },
  { id: 4, nom: 'Lampe de bureau Lumo', categorieId: 2, prix: 49.99, imageUrl: IMG + 'lampe.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 25,
    description: 'Lampe DEL à intensité réglable, bras articulé et port USB de recharge.' },
  { id: 5, nom: 'Tasse en grès Nordik', categorieId: 2, prix: 24.99, imageUrl: IMG + 'tasse.jpg',
    disponibilite: Disponibilite.Rupture, quantiteDisponible: 0,
    description: 'Tasse en grès émaillé de 350 ml, compatible lave-vaisselle et micro-ondes.' },
  { id: 6, nom: 'Tapis de yoga Zen', categorieId: 3, prix: 39.99, imageUrl: IMG + 'yoga.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 30,
    description: 'Tapis antidérapant de 6 mm, matériau recyclé, sangle de transport incluse.' },
  { id: 7, nom: 'Gourde inox 1 L', categorieId: 3, prix: 19.99, imageUrl: IMG + 'gourde.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 60,
    description: 'Gourde isotherme sans BPA, garde l’eau froide pendant 24 h.' },
  { id: 8, nom: 'Roman « Le fleuve »', categorieId: 4, prix: 22.95, imageUrl: IMG + 'roman.jpg',
    disponibilite: Disponibilite.EnStock, quantiteDisponible: 12,
    description: 'Roman québécois contemporain, édition brochée de 320 pages.' },
];

const p = (id) => produits.find((x) => x.id === id);

// ---------- ClientDto ----------
export const client = {
  id: 1,
  nom: 'Amadou Tidiane Diallo',
  courriel: 'tidiane.diallo@exemple.ca',
  telephone: '418 555-0142',
};

// ---------- AdresseDto[] ----------
export const adresses = [
  { id: 1, libelle: 'Domicile', rue: '1595, boulevard Alphonse-Desjardins', ville: 'Lévis',
    province: 'QC', codePostal: 'G6V 0A6', estPrincipale: true },
  { id: 2, libelle: 'Travail', rue: '2500, boulevard de l’Université', ville: 'Québec',
    province: 'QC', codePostal: 'G1V 0A6', estPrincipale: false },
];

// ---------- ModeLivraisonDto[] (4.1 : standard 8 $, express 15 $) ----------
export const modesLivraison = [
  { code: 'Standard', libelle: 'Livraison standard', frais: 8, delai: '3 à 5 jours ouvrables' },
  { code: 'Express', libelle: 'Livraison express', frais: 15, delai: '1 à 2 jours ouvrables' },
];

// ---------- PanierDto ----------
const lignesPanier = [ligne(p(1), 1), ligne(p(4), 2), ligne(p(7), 3)];
const montantsPanier = calculerMontants(lignesPanier);
export const panier = {
  lignes: lignesPanier,
  nombreArticles: lignesPanier.reduce((s, l) => s + l.quantite, 0),
  sousTotal: montantsPanier.sousTotal,
  taxes: montantsPanier.taxes,
  totalAvantLivraison: montantsPanier.totalAvantLivraison,
};

// ---------- RecapitulatifCommandeDto (mode standard par défaut) ----------
export const construireRecapitulatif = (codeMode = 'Standard', adresseId = 1) => {
  const mode = modesLivraison.find((m) => m.code === codeMode);
  const m = calculerMontants(lignesPanier, mode.frais);
  return {
    lignes: lignesPanier,
    adresse: adresses.find((a) => a.id === adresseId),
    modeLivraison: mode,
    sousTotal: m.sousTotal,
    taxes: m.taxes,
    fraisLivraison: m.fraisLivraison,
    total: m.total,
  };
};

// ---------- VerificationStockDto (état « stock insuffisant ») ----------
export const verificationStockEchec = {
  estValide: false,
  produitsInsuffisants: [
    { produitId: 4, nom: 'Lampe de bureau Lumo', quantiteDemandee: 2, quantiteDisponible: 1 },
  ],
};

// ---------- CommandeDetailDto[] ----------
const cmd = ({ numero, date, etat, lignes, adresseId = 1, mode = 'Standard', ...reste }) => {
  const modeLivraison = modesLivraison.find((x) => x.code === mode);
  const m = calculerMontants(lignes, modeLivraison.frais);
  return {
    numero, date, etat, lignes,
    adresse: adresses.find((a) => a.id === adresseId),
    modeLivraison,
    sousTotal: m.sousTotal,
    taxes: m.taxes,
    fraisLivraison: m.fraisLivraison,
    montantTotal: m.total,
    montantPaye: m.total,
    numeroSuivi: null,
    dateLivraisonPrevue: null,
    actionRequise: false,
    produitsIndisponibles: [],
    remboursement: null,
    ...reste,
  };
};

export const commandes = [
  cmd({ numero: 'CMD-1048', date: '2026-11-19', etat: EtatCommande.Confirmee,
    lignes: lignesPanier }),
  cmd({ numero: 'CMD-1045', date: '2026-11-17', etat: EtatCommande.EnPreparation, mode: 'Express',
    lignes: [ligne(p(2), 1), ligne(p(6), 1)],
    actionRequise: true, dateLimiteReponse: '2026-11-20T14:30',
    produitsIndisponibles: [{ produitId: 2, nom: 'Montre connectée Orbit', quantite: 1, montant: 229.94 }] }),
  cmd({ numero: 'CMD-1042', date: '2026-11-14', etat: EtatCommande.Expediee,
    lignes: [ligne(p(3), 1)],
    numeroSuivi: 'PUR7745 1209 3381', dateLivraisonPrevue: '2026-11-21' }),
  cmd({ numero: 'CMD-1031', date: '2026-10-28', etat: EtatCommande.Livree, adresseId: 2,
    lignes: [ligne(p(8), 2), ligne(p(7), 1)],
    numeroSuivi: 'PUR6610 4471 0092', dateLivraisonPrevue: '2026-11-02' }),
  cmd({ numero: 'CMD-1027', date: '2026-10-20', etat: EtatCommande.Annulee,
    lignes: [ligne(p(5), 2)],
    remboursement: { montant: 0, etat: EtatRemboursement.Effectue, motif: 'Annulation complète, remboursement total' } }),
  cmd({ numero: 'CMD-1019', date: '2026-10-05', etat: EtatCommande.Livree, mode: 'Express',
    lignes: [ligne(p(1), 1), ligne(p(6), 1)],
    numeroSuivi: 'PUR5502 8873 4410', dateLivraisonPrevue: '2026-10-07',
    remboursement: { montant: 45.98, etat: EtatRemboursement.Effectue, motif: 'Livraison partielle, produit manquant remboursé' } }),
];

// Remboursement total = montant payé (CMD-1027)
commandes[4].remboursement.montant = commandes[4].montantPaye;

// Montant remboursé simulé pour CMD-1045 (produit indisponible)
commandes[1].produitsIndisponibles[0].montant = arrondir(199.99 * (1 + TPS + TVQ));
// Montant remboursé si le client choisit la livraison partielle (calculé côté serveur au TP3)
commandes[1].montantRemboursementPartiel = arrondir(
  commandes[1].produitsIndisponibles.reduce((s, x) => s + x.montant, 0));

// ---------- CommandeResumeDto (liste) ----------
export const versResume = (c) => ({
  numero: c.numero,
  date: c.date,
  montantTotal: c.montantTotal,
  etat: c.etat,
  actionRequise: c.actionRequise,
  remboursement: c.remboursement,
});
