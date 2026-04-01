import { useFormState, useFormDispatch } from '../../hooks/useForm';

export default function ReviewStep() {
  const { echipa, jucatori, turneu, submitted } = useFormState();
  const dispatch = useFormDispatch();

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-2xl font-bold text-white mb-2">Echipa a fost înregistrată!</h2>
        <p className="text-gray-400 mb-2">
          <span className="text-orange-400 font-semibold">{echipa.nume}</span> este gata pentru turneu!
        </p>
        <p className="text-gray-600 text-sm mb-8">Vei fi contactat pe email pentru detalii suplimentare.</p>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="px-6 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm"
        >
          ↩ Înregistrează altă echipă
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-1">Recapitulare</h2>
      <p className="text-gray-500 text-sm mb-4">Verifică datele înainte de trimitere</p>

      {/* Echipa */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: echipa.culoare }}
          >
            {echipa.nume?.[0]?.toUpperCase() || '?'}
          </div>
          <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Date Echipă</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Nume:</span>{' '}
            <span className="text-white font-medium">{echipa.nume}</span>
          </div>
          <div>
            <span className="text-gray-500">Țară:</span>{' '}
            <span className="text-white font-medium">{echipa.tara}</span>
          </div>
          <div>
            <span className="text-gray-500">Data:</span>{' '}
            <span className="text-white font-medium">{echipa.dataInregistrare}</span>
          </div>
          <div>
            <span className="text-gray-500">Culoare:</span>{' '}
            <span className="inline-block w-4 h-4 rounded-full align-middle" style={{ backgroundColor: echipa.culoare }} />
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Descriere:</span>{' '}
            <span className="text-white">{echipa.descriere}</span>
          </div>
        </div>
      </div>

      {/* Jucatori */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-4">Roster</h3>
        <div className="space-y-2">
          {jucatori.map((j, i) => (
            <div key={j.id} className="flex items-center gap-3 text-sm">
              <span className="text-gray-600 w-4">{i + 1}.</span>
              <span className="text-white font-mono font-medium w-28">{j.nickname}</span>
              <span className="text-orange-400 text-xs bg-orange-500/10 px-2 py-0.5 rounded flex-1">{j.rol}</span>
              <span className="text-gray-500">{j.varsta} ani</span>
            </div>
          ))}
        </div>
      </div>

      {/* Turneu */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-orange-400 font-semibold text-sm uppercase tracking-wider mb-4">Turneu</h3>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-gray-500">Format:</span>{' '}
            <span className="text-white font-medium">{turneu.format}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">Hărți:</span>
            <div className="flex flex-wrap gap-1">
              {turneu.harti.map((h) => (
                <span key={h} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{h}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">Zile disponibile:</span>
            <div className="flex flex-wrap gap-1">
              {turneu.zile.map((z) => (
                <span key={z} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">{z}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => dispatch({ type: 'SUBMIT' })}
        className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm uppercase tracking-wider transition-colors"
      >
        🚀 Înregistrează Echipa
      </button>
    </div>
  );
}
