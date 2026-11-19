// P5 — Catalogue : recherche par mots-clés et filtre par catégorie
import { useSearchParams } from 'react-router-dom';
import Chargement from '../components/Chargement';
import CarteProduit from '../components/CarteProduit';
import Icone from '../components/Icone';
import { useCatalogue, useCategories } from '../hooks/useProduits';
import useTitre from '../hooks/useTitre';

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const motCle = params.get('q') ?? '';
  const categorieId = params.get('categorie');
  const catalogue = useCatalogue(motCle, categorieId);
  const categories = useCategories();
  const categorieActive = categorieId ? categories.donnees?.find((c) => c.id === Number(categorieId))?.nom : null;
  const filtre = motCle || categorieId;
  useTitre(motCle ? `Recherche « ${motCle} »` : categorieActive ?? 'Catalogue');

  const changer = (cle, valeur) => {
    const p = new URLSearchParams(params);
    if (valeur) p.set(cle, valeur); else p.delete(cle);
    setParams(p);
  };

  return (
    <div className="disposition-catalogue">
      <aside className="filtres" aria-label="Filtres">
        <form className="filtres__groupe" onSubmit={(e) => { e.preventDefault(); changer('q', e.target.q.value.trim()); }}>
          <label htmlFor="q" className="filtres__titre">Mots-clés</label>
          <div className="champ-groupe">
            <input id="q" name="q" type="search" defaultValue={motCle} key={motCle} placeholder="Ex. lampe" />
            <button className="filtres__ok" aria-label="Appliquer la recherche">OK</button>
          </div>
        </form>
        <div className="filtres__groupe">
          <h2 className="filtres__titre">Catégories</h2>
          <Chargement etat={categories}>
            {(liste) => (
              <ul className="filtres__liste">
                <li><button className={!categorieId ? 'actif' : ''} aria-pressed={!categorieId} onClick={() => changer('categorie', null)}>Toutes les catégories</button></li>
                {liste.map((c) => (
                  <li key={c.id}>
                    <button className={categorieId === String(c.id) ? 'actif' : ''} aria-pressed={categorieId === String(c.id)}
                      onClick={() => changer('categorie', String(c.id))}>{c.nom}</button>
                  </li>
                ))}
              </ul>
            )}
          </Chargement>
        </div>
      </aside>

      <section aria-labelledby="titre-catalogue">
        <Chargement etat={catalogue}>
          {(produits) => (
            <>
              <div className="catalogue__entete">
                <div>
                  <h1 id="titre-catalogue">{motCle ? `Résultats pour « ${motCle} »` : categorieActive ?? 'Catalogue'}</h1>
                  {filtre && <button className="lien-bouton" onClick={() => setParams({})}>Effacer les filtres</button>}
                </div>
                <span className="catalogue__compte" aria-live="polite">
                  {produits.length} produit{produits.length > 1 ? 's' : ''}
                  {motCle && categorieActive && <> dans {categorieActive}</>}
                </span>
              </div>
              {produits.length === 0 ? (
                <div className="vide carte">
                  <Icone nom="recherche" taille={36} className="vide__icone" />
                  <h2>Aucun produit ne correspond à votre recherche</h2>
                  <p>Essayez un autre mot-clé ou une autre catégorie.</p>
                  <button className="btn btn--primaire" onClick={() => setParams({})}>Voir tout le catalogue</button>
                </div>
              ) : (
                <div className="grille-produits">
                  {produits.map((p) => <CarteProduit key={p.id} produit={p} />)}
                </div>
              )}
            </>
          )}
        </Chargement>
      </section>
    </div>
  );
}
