# Comptoir Boréal — prototype statique (INF37607, TP2)

Prototype React de l'application Web décrite à la section 4.1 du TP1.
Il ne contient **aucune logique métier** : toutes les données viennent de `src/services/`,
qui renvoient pour l'instant des données fictives ayant la forme des futurs DTO de l'API ASP.NET (TP3).

## Lancer le prototype

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # version de production dans dist/
```

Connexion de démonstration : les champs sont préremplis, cliquer sur « Se connecter ».

## Organisation du front-end (proche de MVVM)

```
src/
  pages/       View      — une page par écran (P1 à P15)
  components/  View      — éléments réutilisés (Entete, ResumeMontants, BadgeEtat…)
  hooks/       ViewModel — useCatalogue, usePanier, useCommande… (état + chargement)
  services/    Accès au Model — seule porte vers les données (futur : appels à Commerce.Api)
  mocks/       Données fictives en forme de DTO + scénarios de démonstration (supprimés au TP3)
  contexte/    Session du client (futur : jeton JWT)
```

Règles respectées :
1. Les pages n'importent jamais `mocks/` : elles passent par `hooks/` → `services/`.
2. Aucun calcul métier dans React (taxes, frais, total, stock, remboursement) : les montants arrivent déjà calculés dans les DTO.
3. Les noms (états, champs, cas d'utilisation) reprennent le vocabulaire de l'énoncé.

**Passage au TP3 :** remplacer le corps de `repondre()` / `echouer()` dans `services/apiSimulee.js`
(ou de chaque fonction de service) par des appels `fetch()` vers l'API, puis supprimer `mocks/`.
Les pages ne changent pas.

## Charte graphique et ergonomie

Toutes les valeurs sont centralisées dans `src/styles.css` (variables CSS) : les 15 pages partagent les mêmes couleurs, polices, boutons, alertes et badges.

| Rôle | Couleur | Usage |
|---|---|---|
| Forêt | `#173b32` | Bandeau supérieur, boutons principaux, catégorie et menu actifs |
| Cuivre | `#b86b35` | Accent : logo et icône d’onglet (losange), pastille du panier, étape courante, « Action requise » |
| Crème | `#f7f5f0` | Fond des pages |
| Blanc | `#ffffff` | En-tête, cartes, pied de page |
| Encre | `#18221f` | Texte, bouton du panier |

- **Polices** : *Fraunces* (titres, prix importants) et *Plus Jakarta Sans* (texte, formulaires).
- **En-tête collant** : la recherche, le compte et le panier restent accessibles pendant le défilement.
- **Repères de navigation communs** : en-tête et menu principal identiques partout ; fil d'Ariane sur les fiches produit et le détail des commandes ; barre d'étapes sur les 5 écrans du passage de commande (étapes franchies cliquables) ; menu latéral commun aux pages « Mon compte » (P3, P4, P12, P15).
- **Ergonomie** : titre d'onglet propre à chaque page, sélecteur de quantité − / +, messages d'erreur et d'état vides qui indiquent quoi faire, icônes dans les alertes, cibles cliquables larges, focus clavier visible, disposition adaptée au mobile, animations désactivées si l'utilisateur le demande (`prefers-reduced-motion`).
- **Images** : photos Unsplash (licence libre) copiées dans `public/images/` pour que la démonstration fonctionne hors ligne.

## Pages et routes → contrôleurs ASP.NET (TP3)

| # | Page | Route | Futur contrôleur |
|---|---|---|---|
| P1 | Inscription | `/inscription` | `ClientsController` |
| P2 | Connexion | `/connexion` | `AuthController` |
| P3 | Mon profil | `/compte` | `ClientsController` |
| P4 | Mes adresses | `/compte/adresses` | `ClientsController` |
| P5 | Catalogue (recherche, filtre) | `/catalogue?q=&categorie=` | `ProduitsController` |
| P6 | Détail produit | `/produits/:id` | `ProduitsController` |
| P7 | Panier | `/panier` | `PanierController` |
| P8 | Adresse et livraison | `/commande/livraison` | `CommandesController` |
| P9 | Récapitulatif | `/commande/recapitulatif` | `CommandesController` |
| P10 | Paiement | `/commande/paiement` | `PaiementsController` |
| P11 | Confirmation | `/commande/confirmation/:numero` | `CommandesController` |
| P12 | Commandes en cours | `/commandes` | `CommandesController` |
| P13 | Détail d'une commande | `/commandes/:numero` | `CommandesController` |
| P14 | Produits indisponibles (choix) | `/commandes/:numero/indisponibles` | `CommandesController` |
| P15 | Historique | `/historique` | `CommandesController` |

Pages protégées (authentification requise) : P3, P4, P8 à P15.

## États de démonstration (`?etat=`)

Le prototype n’affiche aucun bandeau de démonstration : les états d’erreur s’obtiennent en ajoutant le paramètre `?etat=` à l’URL (utile pour les captures du rapport).

| Page | URL | État affiché |
|---|---|---|
| Inscription | `/inscription?etat=courriel` puis « Créer mon compte » | courriel déjà utilisé |
| Connexion | `/connexion?etat=erreur` puis « Se connecter » | identifiants invalides |
| Panier | `/panier?etat=vide` | panier vide |
| Livraison | `/commande/livraison?etat=stock` puis « Continuer » | retour au panier, stock insuffisant |
| Paiement | `/commande/paiement?etat=refuse` puis « Payer » | paiement refusé |
| Détail commande | `/commandes/CMD-1045` | action requise (produit indisponible) |
| Détail commande | `/commandes/CMD-1042` | expédiée : numéro de suivi, date prévue |
| Détail commande | `/commandes/CMD-1019` / `CMD-1027` | remboursement partiel / total |

## Correspondance avec l'architecture en oignon du back-end (TP3)

```
Commerce.Domain          (centre)  Entités : Client, Adresse, Produit, Panier, Commande, LigneCommande, Remboursement
                                   Enums  : EtatCommande, Disponibilite, EtatRemboursement, ModeLivraison
                                   Règles : calcul des taxes et du total, frais de livraison, transitions d'état
Commerce.Application               Cas d'utilisation : CreerCompte, AjouterAuPanier, VerifierStock, PasserCommande,
                                   PayerCommande, ChoisirTraitementIndisponible… + interfaces (ports) :
                                   ICommandeRepository, IServicePaiement, IEntrepot, IServiceLivraison, IServiceCourriel
Commerce.Infrastructure            EF Core, implémentations simulées des participants du TP1 (paiement, entrepôt, livraison)
Commerce.Api             (bord)    Contrôleurs du tableau ci-dessus + DTO (même forme que src/mocks/donnees.js)
```

Les dépendances pointent toujours vers le centre. React ne connaît que le contrat de `Commerce.Api`.

### DTO déjà fixés par le prototype

`ProduitDto`, `CategorieDto`, `ClientDto`, `AdresseDto`, `PanierDto` (lignes, sousTotal, taxes{tps,tvq,total}, totalAvantLivraison),
`ModeLivraisonDto`, `RecapitulatifCommandeDto`, `VerificationStockDto`, `ConfirmationCommandeDto`,
`CommandeResumeDto`, `CommandeDetailDto` (numeroSuivi, dateLivraisonPrevue, actionRequise, produitsIndisponibles, remboursement).

Codes d'erreur prévus : `CourrielDejaUtilise` (409), `IdentifiantsInvalides` (401), `StockInsuffisant` (409),
`PaiementRefuse` (402), `ProduitIntrouvable` / `CommandeIntrouvable` (404).
