// P8 — Choix de l'adresse et du mode de livraison ; vérification du stock avant de continuer
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Chargement from '../components/Chargement';
import EtapesCommande from '../components/EtapesCommande';
import BlocAdresse from '../components/BlocAdresse';
import FormulaireAdresse from '../components/FormulaireAdresse';
import ResumeMontants from '../components/ResumeMontants';
import { useAdresses } from '../hooks/useClient';
import { useModesLivraison, useRecapitulatif } from '../hooks/useCommandes';
import * as commandeService from '../services/commandeService';
import useTitre from '../hooks/useTitre';
import Icone from '../components/Icone';
import { montant } from '../utils/format';

export default function Livraison() {
  const adresses = useAdresses();
  const modes = useModesLivraison();
  const [adresseId, setAdresseId] = useState('1');
  const [mode, setMode] = useState('Standard');
  const recap = useRecapitulatif(mode, adresseId === 'nouvelle' ? 1 : adresseId);
  const [verification, setVerification] = useState(false);
  const naviguer = useNavigate();
  useTitre('Adresse et livraison');

  const continuer = async (e) => {
    e.preventDefault();
    setVerification(true);
    try {
      await commandeService.verifierStock();   // 4.1 : vérifier avant le paiement
      naviguer(`/commande/recapitulatif?mode=${mode}&adresse=${adresseId === 'nouvelle' ? 1 : adresseId}`);
    } catch (err) {
      if (err.code === 'StockInsuffisant') naviguer('/panier', { state: { stockInsuffisant: err.details } });
    } finally { setVerification(false); }
  };

  return (
    <section>
      <EtapesCommande courante={1} />
      <h1>Adresse et mode de livraison</h1>

      <form className="disposition-panier" onSubmit={continuer}>
        <div>
          <fieldset className="carte">
            <legend>Adresse de livraison</legend>
            <Chargement etat={adresses}>
              {(liste) => (
                <div className="choix-liste">
                  {liste.map((a) => (
                    <label key={a.id} className={`choix ${adresseId === String(a.id) ? 'choix--actif' : ''}`}>
                      <input type="radio" name="adresse" value={a.id} checked={adresseId === String(a.id)}
                        onChange={(e) => setAdresseId(e.target.value)} />
                      <BlocAdresse adresse={a} />
                    </label>
                  ))}
                  <label className={`choix ${adresseId === 'nouvelle' ? 'choix--actif' : ''}`}>
                    <input type="radio" name="adresse" value="nouvelle" checked={adresseId === 'nouvelle'}
                      onChange={(e) => setAdresseId(e.target.value)} />
                    <span><strong>Saisir une nouvelle adresse</strong></span>
                  </label>
                  {adresseId === 'nouvelle' && (
                    <div className="sous-formulaire">
                      <FormulaireAdresse prefixe="cmd" />
                      <label className="case"><input type="checkbox" defaultChecked /> Enregistrer cette adresse dans mon compte</label>
                    </div>
                  )}
                </div>
              )}
            </Chargement>
            <Link to="/compte/adresses" className="lien-petit">Gérer mes adresses</Link>
          </fieldset>

          <fieldset className="carte">
            <legend>Mode de livraison</legend>
            <Chargement etat={modes}>
              {(liste) => (
                <div className="choix-liste">
                  {liste.map((m) => (
                    <label key={m.code} className={`choix ${mode === m.code ? 'choix--actif' : ''}`}>
                      <input type="radio" name="mode" value={m.code} checked={mode === m.code}
                        onChange={(e) => setMode(e.target.value)} />
                      <Icone nom={m.code === 'Express' ? 'horloge' : 'camion'} className="choix__icone" />
                      <span className="choix__texte"><strong>{m.libelle}</strong><span>{m.delai}</span></span>
                      <strong className="choix__prix">{montant(m.frais)}</strong>
                    </label>
                  ))}
                </div>
              )}
            </Chargement>
          </fieldset>
        </div>

        <aside className="carte resume">
          <h2>Montant de la commande</h2>
          <Chargement etat={recap}>
            {(r) => <ResumeMontants sousTotal={r.sousTotal} taxes={r.taxes} fraisLivraison={r.fraisLivraison} total={r.total} />}
          </Chargement>
          <button className="btn btn--primaire btn--bloc btn--grand" disabled={verification}>
            {verification ? 'Vérification des stocks…' : 'Continuer vers le récapitulatif'}
          </button>
          <Link to="/panier" className="btn btn--tertiaire btn--bloc"><Icone nom="retour" taille={16} /> Retour au panier</Link>
        </aside>
      </form>
    </section>
  );
}
