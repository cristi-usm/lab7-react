import { useFormState } from '../hooks/useForm';

export default function Preview() {
  const { echipa, jucatori, turneu } = useFormState();

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 h-fit sticky top-4">
      <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">
        ⚡ Preview Live
      </div>

      {/* Card echipa */}
      <div
        className="rounded-lg p-4 mb-4 border border-gray-700"
        style={{ borderLeftColor: echipa.culoare, borderLeftWidth: 4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: echipa.culoare }}
          >
            {echipa.nume ? echipa.nume[0].toUpperCase() : '?'}
          </div>
          <div>
            <div className="text-white font-bold text-sm">
              {echipa.nume || <span className="text-gray-600 italic">Nume echipă...</span>}
            </div>
            <div className="text-gray-500 text-xs">
              {echipa.tara || 'Țară necunoscută'}
            </div>
          </div>
        </div>
        {echipa.descriere && (
          <p className="text-gray-400 text-xs mt-2 line-clamp-2">{echipa.descriere}</p>
        )}
        {echipa.dataInregistrare && (
          <p className="text-gray-600 text-xs mt-1">📅 {echipa.dataInregistrare}</p>
        )}
      </div>

      {/* Jucatori */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Roster</div>
        <div className="space-y-1">
          {jucatori.map((j, i) => (
            <div key={j.id} className="flex items-center gap-2">
              <span className="text-gray-600 text-xs w-4">{i + 1}.</span>
              <span className="text-white text-xs font-mono">
                {j.nickname || <span className="text-gray-700">Player{i + 1}</span>}
              </span>
              {j.rol && (
                <span className="ml-auto text-orange-500 text-xs bg-orange-500/10 px-1.5 py-0.5 rounded">
                  {j.rol.split(' ')[0]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Turneu */}
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Turneu</div>
        {turneu.format ? (
          <div className="text-orange-400 text-xs font-medium mb-1">🏆 {turneu.format}</div>
        ) : (
          <div className="text-gray-700 text-xs italic mb-1">Format neselectat</div>
        )}
        {turneu.harti.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {turneu.harti.map((h) => (
              <span key={h} className="text-xs bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                {h}
              </span>
            ))}
          </div>
        )}
        {turneu.zile.length > 0 && (
          <div className="text-gray-500 text-xs">
            📆 {turneu.zile.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
