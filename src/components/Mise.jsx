import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Entete from './Entete';
import PiedDePage from './PiedDePage';

export default function Mise() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <a href="#contenu" className="evitement">Aller au contenu</a>
      <Entete />
      <main id="contenu" className="conteneur principal"><Outlet /></main>
      <PiedDePage />
    </>
  );
}
