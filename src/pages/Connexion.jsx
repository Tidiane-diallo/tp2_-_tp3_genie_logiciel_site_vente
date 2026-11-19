// P2 — Authentification (requise avant de passer une commande)
import { useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Champ from '../components/Champ';
import Alerte from '../components/Alerte';
import { useSession } from '../contexte/SessionContexte';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';

export default function Connexion() {
  const [params] = useSearchParams();
  const retour = params.get('retour');
  const { connecter, estConnecte } = useSession();
  const [erreur, setErreur] = useState(null);
  const naviguer = useNavigate();
  useTitre('Connexion');

  const soumettre = async (e) => {
    e.preventDefault();
    try {
      await connecter(e.target.courriel.value, e.target.mdp.value);
      naviguer(retour || '/catalogue', { replace: true });
    } catch (err) { setErreur(err); }
  };

  // Un client déjà connecté n'a rien à faire ici : on le renvoie là où il allait (ou à son compte).
  if (estConnecte) return <Navigate to={retour || '/compte'} replace />;

  return (
    <section className="page-acces">
      <div className="page-acces__grille">
      <div className="page-acces__formulaire">
      <h1>Connexion</h1>
      <p className="intro">Connectez-vous pour passer une commande et suivre vos livraisons.</p>
      {params.get('inscrit') && <Alerte type="succes" titre="Compte créé">Vous pouvez maintenant vous connecter.</Alerte>}
      {retour?.startsWith('/commande') && !erreur && (
        <Alerte type="info">Connectez-vous pour passer votre commande. Votre panier est conservé.</Alerte>
      )}
      {erreur && <Alerte type="erreur">{erreur.message}</Alerte>}

      <form className="carte" onSubmit={soumettre}>
        <Champ id="courriel" libelle="Adresse courriel" type="email" requis autoComplete="email"
          defaultValue="amadoutidiane@uqar.ca" />
        <Champ id="mdp" libelle="Mot de passe" type="password" requis autoComplete="current-password"
          defaultValue="motdepasse" />
        <button className="btn btn--primaire btn--bloc">Se connecter</button>
        <p className="centre petit">Nouveau client ? <Link to="/inscription">Créer un compte</Link></p>
      </form>
      </div>
      <PanneauAvantages />
      </div>
    </section>
  );
}

/** Rappelle au client ce que son compte lui permet (réutilisé à l'inscription). */
// eslint-disable-next-line react-refresh/only-export-components
export function PanneauAvantages() {
  return (
    <aside className="page-acces__panneau" aria-label="Avantages du compte client">
      <h2>Votre compte Comptoir Boréal</h2>
      <ul>
        <li><Icone nom="colis" /> <span><strong>Suivez vos commandes</strong> de la confirmation à la livraison, avec le numéro de suivi.</span></li>
        <li><Icone nom="epingle" /> <span><strong>Enregistrez plusieurs adresses</strong> : domicile, travail, chalet.</span></li>
        <li><Icone nom="archive" /> <span><strong>Retrouvez votre historique</strong> et vos remboursements.</span></li>
      </ul>
    </aside>
  );
}
