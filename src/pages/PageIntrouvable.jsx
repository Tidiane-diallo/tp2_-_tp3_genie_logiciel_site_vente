import { Link } from 'react-router-dom';
import Icone from '../components/Icone';
import useTitre from '../hooks/useTitre';

export default function PageIntrouvable() {
  useTitre('Page introuvable');
  return (
    <section className="vide carte">
      <Icone nom="recherche" taille={40} className="vide__icone" />
      <h1>Cette page n’existe pas</h1>
      <p>L’adresse est peut-être incorrecte ou la page a été déplacée.</p>
      <div className="actions actions--centre">
        <Link to="/catalogue" className="btn btn--primaire">Retour au catalogue</Link>
        <Link to="/commandes" className="btn btn--secondaire">Mes commandes</Link>
      </div>
    </section>
  );
}
