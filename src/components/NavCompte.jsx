import { NavLink } from 'react-router-dom';
import { useSession } from '../contexte/SessionContexte';
import Icone from './Icone';

const LIENS = [
  ['/compte', 'utilisateur', 'Mon profil'],
  ['/compte/adresses', 'epingle', 'Mes adresses'],
  ['/commandes', 'colis', 'Mes commandes'],
  ['/historique', 'archive', 'Historique'],
];

/**
 * Mise en page commune des pages « Mon compte » (P3, P4, P12, P15) :
 * même menu latéral, même titre, pour que le client garde ses repères.
 */
export default function EspaceCompte({ titre, intro, action, children }) {
  const { client } = useSession();
  return (
    <div className="espace-compte">
      <aside className="espace-compte__menu">
        <div className="espace-compte__client">
          <span className="avatar avatar--grand" aria-hidden="true">{client?.nom.split(' ').map((m) => m[0]).slice(0, 2).join('')}</span>
          <div><strong>{client?.nom}</strong><span className="petit">{client?.courriel}</span></div>
        </div>
        <nav aria-label="Mon compte">
          <ul>
            {LIENS.map(([to, icone, libelle]) => (
              <li key={to}><NavLink to={to} end><Icone nom={icone} /> {libelle}</NavLink></li>
            ))}
          </ul>
        </nav>
      </aside>
      <section className="espace-compte__contenu">
        <div className="titre-ligne">
          <h1>{titre}</h1>
          {action}
        </div>
        {intro && <p className="intro">{intro}</p>}
        {children}
      </section>
    </div>
  );
}
