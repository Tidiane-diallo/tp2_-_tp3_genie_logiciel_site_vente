import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSession } from '../contexte/SessionContexte';
import { usePanier } from '../hooks/usePanier';
import Icone from './Icone';

export default function Entete() {
  const { estConnecte, client, deconnecter } = useSession();
  const { donnees: panier } = usePanier();
  const [recherche, setRecherche] = useState('');
  const naviguer = useNavigate();
  const nombre = panier?.nombreArticles ?? 0;

  const rechercher = (e) => {
    e.preventDefault();
    naviguer(`/catalogue${recherche ? `?q=${encodeURIComponent(recherche)}` : ''}`);
  };

  const sortir = async () => { await deconnecter(); naviguer('/catalogue'); };

  return (
    <>
      <div className="bandeau-haut">
        <div className="conteneur bandeau-haut__contenu">
          <span>Sélection quotidienne · Objets durables et essentiels du quotidien</span>
          <span>Standard 8 $ · Express 15 $</span>
        </div>
      </div>

      <header className="entete">
        <div className="entete__haut conteneur">
          <Link to="/catalogue" className="logo" aria-label="Comptoir Boréal, accueil">
            <span className="logo__marque" aria-hidden="true" />
            <span>Comptoir Boréal</span>
          </Link>

          <form className="entete__recherche" onSubmit={rechercher} role="search">
            <input type="search" placeholder="Rechercher un produit, une matière…" aria-label="Rechercher un produit"
              value={recherche} onChange={(e) => setRecherche(e.target.value)} />
            <button type="submit">Rechercher</button>
          </form>

          <div className="entete__compte">
            {estConnecte ? (
              <>
                <Link to="/compte" className="entete__client">
                  <span className="avatar" aria-hidden="true">{client?.nom.split(' ').map((m) => m[0]).slice(0, 2).join('')}</span>
                  <span className="entete__bonjour">Bonjour, {client?.nom.split(' ')[0]}</span>
                </Link>
                <button className="entete__lien" onClick={sortir}>
                  <Icone nom="sortie" taille={18} /> <span className="entete__lien-texte">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="entete__lien">Connexion</Link>
                <Link to="/inscription" className="entete__lien entete__lien--inscription">Créer un compte</Link>
              </>
            )}
            <Link to="/panier" className="entete__panier" aria-label={`Panier, ${nombre} article${nombre > 1 ? 's' : ''}`}>
              <span>Panier</span>
              <span className="pastille">{nombre}</span>
            </Link>
          </div>
        </div>

        <nav className="entete__nav conteneur" aria-label="Navigation principale">
          <NavLink to="/catalogue">Catalogue</NavLink>
          <NavLink to="/commandes">Mes commandes</NavLink>
          <NavLink to="/historique">Historique</NavLink>
          <NavLink to="/compte">Mon compte</NavLink>
        </nav>
      </header>
    </>
  );
}
