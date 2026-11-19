/** Champ de formulaire avec libellé, aide et message d'erreur accessibles. */
export default function Champ({ id, libelle, aide, erreur, requis, children, className = '', ...props }) {
  return (
    <div className={`champ ${className} ${erreur ? 'champ--erreur' : ''}`}>
      <label htmlFor={id}>{libelle}{requis && <span className="requis" aria-hidden="true"> *</span>}</label>
      {children ?? <input id={id} required={requis} aria-invalid={!!erreur}
        aria-describedby={erreur ? `${id}-err` : aide ? `${id}-aide` : undefined} {...props} />}
      {aide && !erreur && <small id={`${id}-aide`} className="champ__aide">{aide}</small>}
      {erreur && <small id={`${id}-err`} className="champ__erreur">{erreur}</small>}
    </div>
  );
}
