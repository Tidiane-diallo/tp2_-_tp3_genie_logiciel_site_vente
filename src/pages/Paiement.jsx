// P10 — Paiement par carte de débit ou de crédit ; état « paiement refusé »
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import EtapesCommande from '../components/EtapesCommande';
import Champ from '../components/Champ';
import Alerte from '../components/Alerte';
import ResumeMontants from '../components/ResumeMontants';
import { useRecapitulatif } from '../hooks/useCommandes';
import * as paiementService from '../services/paiementService';
import useTitre from '../hooks/useTitre';
import Icone from '../components/Icone';
import { montant } from '../utils/format';

export default function Paiement() {
  const [params] = useSearchParams();
  const recap = useRecapitulatif(params.get('mode') ?? 'Standard', params.get('adresse') ?? 1);
  const [typeCarte, setTypeCarte] = useState('Credit');
  const [refus, setRefus] = useState(null);
  const [envoi, setEnvoi] = useState(false);
  const naviguer = useNavigate();
  useTitre('Paiement');

  const payer = async (e) => {
    e.preventDefault();
    setEnvoi(true); setRefus(null);
    try {
      const confirmation = await paiementService.payer({ /* PaiementDto */ });
      naviguer(`/commande/confirmation/${confirmation.numero}`, { replace: true, state: confirmation });
    } catch (err) {
      setRefus(err);
    } finally { setEnvoi(false); }
  };

  return (
    <section>
      <EtapesCommande courante={3} />
      <h1>Paiement</h1>

      <Chargement etat={recap}>
        {(r) => (
          <div className="disposition-panier">
            <form className="carte" onSubmit={payer} noValidate>
              {refus && (
                <Alerte type="erreur" titre="Paiement refusé">
                  {refus.message} Votre commande n’est pas confirmée. Vérifiez les informations,
                  effectuez une nouvelle tentative ou utilisez une autre carte.
                </Alerte>
              )}
              <fieldset>
                <legend>Type de carte</legend>
                <div className="choix-ligne">
                  {[['Credit', 'Carte de crédit'], ['Debit', 'Carte de débit']].map(([v, l]) => (
                    <label key={v} className={`choix ${typeCarte === v ? 'choix--actif' : ''}`}>
                      <input type="radio" name="type" value={v} checked={typeCarte === v} onChange={() => setTypeCarte(v)} />
                      <Icone nom="carte" className="choix__icone" /> <strong>{l}</strong>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grille-form">
                <Champ id="titulaire" libelle="Nom du titulaire" requis autoComplete="cc-name" className="large" />
                <Champ id="numero" libelle="Numéro de carte" requis inputMode="numeric" autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456" className="large" />
                <Champ id="expiration" libelle="Date d’expiration" requis placeholder="MM/AA" autoComplete="cc-exp" />
                <Champ id="cvc" libelle="Code de sécurité" requis inputMode="numeric" placeholder="123" autoComplete="cc-csc"
                  aide="3 chiffres au dos de la carte." />
              </div>
              <p className="note-securite"><Icone nom="cadenas" taille={18} /> Vos informations de paiement sont transmises de façon sécurisée au service de paiement. Elles ne sont jamais conservées par Comptoir Boréal.</p>
              <div className="actions actions--entre">
                <Link to={`/commande/recapitulatif?${params}`} className="btn btn--tertiaire"><Icone nom="retour" taille={16} /> Récapitulatif</Link>
                <button className="btn btn--primaire btn--grand" disabled={envoi}>
                  <Icone nom="cadenas" taille={18} />
                  {envoi ? 'Autorisation en cours…' : `Payer ${montant(r.total)}`}
                </button>
              </div>
            </form>
            <aside className="carte resume">
              <h2>Montant à payer</h2>
              <ResumeMontants sousTotal={r.sousTotal} taxes={r.taxes} fraisLivraison={r.fraisLivraison} total={r.total} libelleTotal="Total à payer" />
              <p className="petit">{r.lignes.length} produit{r.lignes.length > 1 ? 's' : ''}, {r.modeLivraison.libelle.toLowerCase()} ({r.modeLivraison.delai}).</p>
              <p className="petit">La commande n’est confirmée qu’après l’autorisation du paiement.</p>
            </aside>
          </div>
        )}
      </Chargement>
    </section>
  );
}
