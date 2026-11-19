import Champ from './Champ';

const PROVINCES = ['QC', 'ON', 'NB', 'NS', 'PE', 'NL', 'MB', 'SK', 'AB', 'BC', 'YT', 'NT', 'NU'];

/** Champs d'une AdresseDto, réutilisés à l'inscription, dans « Mes adresses » et à la commande. */
export default function FormulaireAdresse({ prefixe = 'adr', valeur = {}, avecLibelle = true }) {
  return (
    <div className="grille-form">
      {avecLibelle && (
        <Champ id={`${prefixe}-libelle`} libelle="Nom de l’adresse" placeholder="Ex. Domicile, Travail"
          defaultValue={valeur.libelle} />
      )}
      <Champ id={`${prefixe}-rue`} libelle="Numéro et rue" requis defaultValue={valeur.rue}
        placeholder="1595, boulevard Alphonse-Desjardins" className="large" />
      <Champ id={`${prefixe}-ville`} libelle="Ville" requis defaultValue={valeur.ville} />
      <Champ id={`${prefixe}-province`} libelle="Province" requis>
        <select id={`${prefixe}-province`} defaultValue={valeur.province ?? 'QC'}>
          {PROVINCES.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Champ>
      <Champ id={`${prefixe}-cp`} libelle="Code postal" requis defaultValue={valeur.codePostal}
        placeholder="G6V 0A6" aide="Format : A1A 1A1" />
    </div>
  );
}
