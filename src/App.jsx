import { Routes, Route, Navigate } from 'react-router-dom';
import Mise from './components/Mise';
import RouteProtegee from './components/RouteProtegee';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import Adresses from './pages/Adresses';
import Catalogue from './pages/Catalogue';
import DetailProduit from './pages/DetailProduit';
import Panier from './pages/Panier';
import Livraison from './pages/Livraison';
import Recapitulatif from './pages/Recapitulatif';
import Paiement from './pages/Paiement';
import Confirmation from './pages/Confirmation';
import CommandesEnCours from './pages/CommandesEnCours';
import DetailCommande from './pages/DetailCommande';
import ProduitsIndisponibles from './pages/ProduitsIndisponibles';
import Historique from './pages/Historique';
import PageIntrouvable from './pages/PageIntrouvable';

const protege = (el) => <RouteProtegee>{el}</RouteProtegee>;

/** Chaque route annonce le contrôleur ASP.NET qui la servira au TP3 (voir README). */
export default function App() {
  return (
    <Routes>
      <Route element={<Mise />}>
        <Route index element={<Navigate to="/catalogue" replace />} />
        {/* Compte client — ClientsController / AuthController */}
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="compte" element={protege(<Profil />)} />
        <Route path="compte/adresses" element={protege(<Adresses />)} />
        {/* Produits — ProduitsController */}
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="produits/:id" element={<DetailProduit />} />
        {/* Panier — PanierController */}
        <Route path="panier" element={<Panier />} />
        {/* Passage de commande — CommandesController / PaiementsController */}
        <Route path="commande/livraison" element={protege(<Livraison />)} />
        <Route path="commande/recapitulatif" element={protege(<Recapitulatif />)} />
        <Route path="commande/paiement" element={protege(<Paiement />)} />
        <Route path="commande/confirmation/:numero" element={protege(<Confirmation />)} />
        {/* Suivi — CommandesController */}
        <Route path="commandes" element={protege(<CommandesEnCours />)} />
        <Route path="commandes/:numero" element={protege(<DetailCommande />)} />
        <Route path="commandes/:numero/indisponibles" element={protege(<ProduitsIndisponibles />)} />
        <Route path="historique" element={protege(<Historique />)} />
        <Route path="*" element={<PageIntrouvable />} />
      </Route>
    </Routes>
  );
}
