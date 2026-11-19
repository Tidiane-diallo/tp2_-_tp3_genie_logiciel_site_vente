import { Link } from 'react-router-dom';

export default function PiedDePage() {
  return (
    <footer className="pied">
      <div className="conteneur pied__contenu">
        <span>© 2026 Comptoir Boréal — prototype statique (INF37607, TP2)</span>
        <nav className="pied__liens" aria-label="Liens du pied de page">
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/panier">Panier</Link>
          <Link to="/commandes">Mes commandes</Link>
          <Link to="/compte">Mon compte</Link>
        </nav>
        <span>Paiement sécurisé · Livraison standard 8 $ · Express 15 $</span>
      </div>
    </footer>
  );
}
