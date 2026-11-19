// P1 — Création d'un compte (4.1 « Création et gestion du compte client »)
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSession } from '../contexte/SessionContexte';
import Champ from '../components/Champ';
import FormulaireAdresse from '../components/FormulaireAdresse';
import Alerte from '../components/Alerte';
import * as clientService from '../services/clientService';
import useTitre from '../hooks/useTitre';

export default function Inscription() {
  const [erreur, setErreur] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const naviguer = useNavigate();
  const { estConnecte } = useSession();
  useTitre('Créer un compte');

  const soumettre = async (e) => {
    e.preventDefault();
    setEnvoi(true); setErreur(null);
    try {
      await clientService.inscrire({ /* InscriptionDto */ });
      naviguer('/connexion?inscrit=1');
    } catch (err) {
      setErreur(err);
    } finally { setEnvoi(false); }
  };

  if (estConnecte) return <Navigate to="/compte" replace />;

  return (
    <section className="page-etroite">
      <h1>Créer un compte</h1>
      <p className="intro">Déjà client ? <Link to="/connexion">Connectez-vous</Link>. Les champs marqués d’un <span className="requis">*</span> sont obligatoires.</p>

      {erreur && <Alerte type="erreur" titre="Impossible de créer le compte">{erreur.message}</Alerte>}

      <form className="carte" onSubmit={soumettre} noValidate>
        <fieldset>
          <legend>Vos informations</legend>
          <div className="grille-form">
            <Champ id="nom" libelle="Nom complet" requis autoComplete="name" className="large" />
            <Champ id="courriel" libelle="Adresse courriel" type="email" requis autoComplete="email"
              aide="Elle servira d’identifiant ; un seul compte par courriel."
              erreur={erreur?.code === 'CourrielDejaUtilise' ? 'Ce courriel est déjà utilisé.' : null} />
            <Champ id="telephone" libelle="Téléphone" type="tel" requis autoComplete="tel" placeholder="418 555-0142" />
            <Champ id="mdp" libelle="Mot de passe" type="password" requis autoComplete="new-password"
              aide="8 caractères minimum." />
            <Champ id="mdp2" libelle="Confirmer le mot de passe" type="password" requis autoComplete="new-password" />
          </div>
        </fieldset>
        <fieldset>
          <legend>Adresse de livraison principale</legend>
          <FormulaireAdresse prefixe="insc" avecLibelle={false} />
        </fieldset>
        <div className="actions">
          <Link to="/catalogue" className="btn btn--tertiaire">Annuler</Link>
          <button className="btn btn--primaire" disabled={envoi}>{envoi ? 'Création…' : 'Créer mon compte'}</button>
        </div>
      </form>
    </section>
  );
}
