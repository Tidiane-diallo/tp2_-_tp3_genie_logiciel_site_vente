// P4 — Gérer plusieurs adresses de livraison (ajouter, modifier, supprimer)
import { useState } from 'react';
import Chargement from '../components/Chargement';
import EspaceCompte from '../components/NavCompte';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';
import BlocAdresse from '../components/BlocAdresse';
import FormulaireAdresse from '../components/FormulaireAdresse';
import Alerte from '../components/Alerte';
import { useAdresses } from '../hooks/useClient';
import * as clientService from '../services/clientService';

export default function Adresses() {
  const adresses = useAdresses();
  const [edition, setEdition] = useState(null); // null | 'nouvelle' | AdresseDto
  const [message, setMessage] = useState(null);
  const [aSupprimer, setASupprimer] = useState(null); // id de l'adresse dont on demande confirmation
  useTitre('Mes adresses');

  const enregistrer = async (e) => {
    e.preventDefault();
    if (edition === 'nouvelle') await clientService.ajouterAdresse({});
    else await clientService.modifierAdresse(edition.id, {});
    setMessage(edition === 'nouvelle' ? 'Adresse ajoutée.' : 'Adresse modifiée.');
    setEdition(null);
  };

  const supprimer = async (a) => {
    await clientService.supprimerAdresse(a.id);
    setASupprimer(null);
    setMessage(`L’adresse « ${a.libelle} » a été supprimée.`);
  };

  const rendrePrincipale = async (a) => {
    await clientService.definirAdressePrincipale(a.id);
    setMessage(`« ${a.libelle} » est maintenant votre adresse principale.`);
  };

  return (
    <EspaceCompte titre="Mes adresses" intro="Choisissez l’une de ces adresses au moment de commander, ou ajoutez-en une nouvelle."
      action={!edition && <button className="btn btn--primaire" onClick={() => { setEdition('nouvelle'); setMessage(null); }}><Icone nom="plus" taille={18} /> Ajouter une adresse</button>}>
      {message && <Alerte type="succes">{message}</Alerte>}

      {edition && (
        <form className="carte" onSubmit={enregistrer}>
          <h3>{edition === 'nouvelle' ? 'Nouvelle adresse' : `Modifier « ${edition.libelle} »`}</h3>
          <FormulaireAdresse prefixe="edit" valeur={edition === 'nouvelle' ? {} : edition} />
          <label className="case"><input type="checkbox" defaultChecked={edition.estPrincipale} /> Utiliser comme adresse principale</label>
          <div className="actions">
            <button type="button" className="btn btn--tertiaire" onClick={() => setEdition(null)}>Annuler</button>
            <button className="btn btn--primaire">Enregistrer l’adresse</button>
          </div>
        </form>
      )}

      <Chargement etat={adresses}>
        {(liste) => (
          <div className="grille-adresses">
            {liste.map((a) => (
              <article key={a.id} className={`carte carte--adresse ${a.estPrincipale ? 'carte--principale' : ''}`}>
                {a.estPrincipale && <span className="badge badge--principale">Adresse principale</span>}
                <BlocAdresse adresse={a} />
                {!a.estPrincipale && (
                  <button className="lien-bouton carte--adresse__principale" onClick={() => rendrePrincipale(a)}>Définir comme adresse principale</button>
                )}
                {aSupprimer === a.id ? (
                  <div className="confirmation-suppression" role="alert">
                    <p>Supprimer l’adresse « {a.libelle} » ?</p>
                    <div className="actions actions--gauche">
                      <button className="btn btn--danger btn--petit" onClick={() => supprimer(a)}>Oui, supprimer</button>
                      <button className="btn btn--tertiaire btn--petit" onClick={() => setASupprimer(null)}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  <div className="actions actions--gauche">
                    <button className="btn btn--secondaire btn--petit" onClick={() => { setEdition(a); setMessage(null); }}>Modifier</button>
                    <button className="btn btn--danger btn--petit" onClick={() => { setASupprimer(a.id); setMessage(null); }}
                      disabled={a.estPrincipale} title={a.estPrincipale ? 'Choisissez une autre adresse principale avant de la supprimer' : undefined}>
                      Supprimer
                    </button>
                  </div>
                )}
                {a.estPrincipale && <p className="petit carte--adresse__note">L’adresse principale ne peut pas être supprimée.</p>}
              </article>
            ))}
          </div>
        )}
      </Chargement>
    </EspaceCompte>
  );
}
