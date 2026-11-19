export default function BlocAdresse({ adresse }) {
  return (
    <address className="bloc-adresse">
      <strong>{adresse.libelle}</strong><br />
      {adresse.rue}<br />
      {adresse.ville} ({adresse.province}) {adresse.codePostal}
    </address>
  );
}
