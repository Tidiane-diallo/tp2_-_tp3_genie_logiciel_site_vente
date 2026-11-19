import { useState } from 'react';
import Icone from './Icone';

/** Sélecteur de quantité − / + (cibles plus larges qu'un champ numérique seul, utilisable au clavier). */
export default function Quantite({ id, valeur, min = 1, max, onChange, libelle, desactive }) {
  const [actuelle, setActuelle] = useState(valeur ?? min);
  const changer = (n) => {
    const borne = Math.max(min, max ? Math.min(max, n) : n);
    setActuelle(borne);
    onChange?.(borne);
  };
  return (
    <div className="quantite">
      <button type="button" onClick={() => changer(actuelle - 1)} disabled={desactive || actuelle <= min}
        aria-label={`Diminuer la quantité${libelle ? ` de ${libelle}` : ''}`}><Icone nom="moins" taille={16} /></button>
      <input id={id} type="number" inputMode="numeric" min={min} max={max} value={actuelle} disabled={desactive}
        aria-label={libelle ? `Quantité de ${libelle}` : undefined}
        onChange={(e) => changer(Number(e.target.value) || min)} />
      <button type="button" onClick={() => changer(actuelle + 1)} disabled={desactive || (max && actuelle >= max)}
        aria-label={`Augmenter la quantité${libelle ? ` de ${libelle}` : ''}`}><Icone nom="plus" taille={16} /></button>
    </div>
  );
}
