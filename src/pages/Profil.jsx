// P3 — Consulter et modifier son profil
import { useState } from 'react';
import Champ from '../components/Champ';
import Alerte from '../components/Alerte';
import Chargement from '../components/Chargement';
import EspaceCompte from '../components/NavCompte';
import useTitre from '../hooks/useTitre';
import { Link } from 'react-router-dom';
import BlocAdresse from '../components/BlocAdresse';
import { useProfil, useAdresses } from '../hooks/useClient';
import * as clientService from '../services/clientService';

export default function Profil() {
  const profil = useProfil();
  const adresses = useAdresses();
  const [enregistre, setEnregistre] = useState(false);
  useTitre('Mon profil');

  const soumettre = async (e) => {
    e.preventDefault();
    await clientService.modifierProfil({ /* ModifierProfilDto */ });
    setEnregistre(true);
  };

  return (
    <EspaceCompte titre="Mon profil" intro="Ces informations servent à vous identifier et à vous joindre au sujet de vos commandes.">
      <Chargement etat={profil}>
        {(client) => (
          <form className="carte" onSubmit={soumettre} onChange={() => setEnregistre(false)}>
            <h2>Coordonnées</h2>
            {enregistre && <Alerte type="succes">Modifications enregistrées.</Alerte>}
            <div className="grille-form">
              <Champ id="nom" libelle="Nom complet" requis defaultValue={client.nom} className="large" />
              <Champ id="courriel" libelle="Adresse courriel" type="email" requis defaultValue={client.courriel}
                aide="Identifiant de votre compte." />
              <Champ id="telephone" libelle="Téléphone" type="tel" requis defaultValue={client.telephone} />
            </div>
            <details className="details">
              <summary>Changer mon mot de passe</summary>
              <div className="grille-form">
                <Champ id="mdp-actuel" libelle="Mot de passe actuel" type="password" />
                <Champ id="mdp-nouveau" libelle="Nouveau mot de passe" type="password" />
              </div>
            </details>
            <div className="actions">
              <button type="reset" className="btn btn--tertiaire">Annuler les modifications</button>
              <button className="btn btn--primaire">Enregistrer les modifications</button>
            </div>
          </form>
        )}
      </Chargement>

      <section className="carte" aria-labelledby="titre-adresse-principale">
        <h2 id="titre-adresse-principale">Adresse de livraison principale</h2>
        <Chargement etat={adresses}>
          {(liste) => {
            const principale = liste.find((a) => a.estPrincipale);
            return (
              <div className="profil__adresse">
                {principale ? <BlocAdresse adresse={principale} /> : <p className="petit">Aucune adresse principale.</p>}
                <div>
                  <p className="petit">{liste.length} adresse{liste.length > 1 ? 's' : ''} enregistrée{liste.length > 1 ? 's' : ''}</p>
                  <Link to="/compte/adresses" className="btn btn--secondaire btn--petit">Gérer mes adresses</Link>
                </div>
              </div>
            );
          }}
        </Chargement>
      </section>
    </EspaceCompte>
  );
}
