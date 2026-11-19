import Icone from './Icone';

const ICONES = { succes: 'crochet', erreur: 'erreur', avertissement: 'attention', info: 'info', neutre: 'info' };

export default function Alerte({ type = 'info', titre, children }) {
  return (
    <div className={`alerte alerte--${type}`} role={type === 'erreur' ? 'alert' : 'status'}>
      <Icone nom={ICONES[type]} className="alerte__icone" />
      <div className="alerte__corps">
        {titre && <strong className="alerte__titre">{titre}</strong>}
        <div>{children}</div>
      </div>
    </div>
  );
}
