import turneuData from '../../data/turneu.json';
import harti from '../../data/harti.json';
import { useFormState, useFormDispatch } from '../../hooks/useForm';

export default function TurneuStep() {
  const { turneu, errors, touched } = useFormState();
  const dispatch = useFormDispatch();

  const err = (camp) => touched[camp] && errors[camp];

  const handleBlur = (camp) => dispatch({ type: 'TOUCH_FIELD', camp });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white mb-1">Configurare Turneu</h2>
      <p className="text-gray-500 text-sm mb-4">Alege preferințele pentru participarea la turneu</p>

      {/* Format - Radio */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Format Turneu <span className="text-orange-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {turneuData.formate.map((f) => (
            <label
              key={f}
              className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all
                ${turneu.format === f
                  ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                  : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500'}
              `}
            >
              <input
                type="radio"
                name="format"
                value={f}
                checked={turneu.format === f}
                onChange={() => {
                  dispatch({ type: 'SET_TURNEU_CAMP', camp: 'format', valoare: f });
                  handleBlur('turneu.format');
                }}
                className="sr-only"
              />
              <div className="text-2xl mb-1">
                {f.includes('5v5') ? '🏆' : f.includes('3v3') ? '⚔️' : '🎯'}
              </div>
              <div className="text-sm font-medium">{f}</div>
            </label>
          ))}
        </div>
        {err('turneu.format') && <p className="text-red-400 text-xs mt-1">{errors['turneu.format']}</p>}
      </div>

      {/* Harti - Checkbox */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Hărți Preferate <span className="text-orange-500">*</span>
          <span className="text-gray-600 font-normal ml-2">(minim 2)</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {harti.map((h) => {
            const selected = turneu.harti.includes(h);
            return (
              <label
                key={h}
                className={`cursor-pointer px-3 py-1.5 rounded-lg border text-sm font-medium transition-all
                  ${selected
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {
                    dispatch({ type: 'TOGGLE_HARTA', harta: h });
                    handleBlur('turneu.harti');
                  }}
                  className="sr-only"
                />
                {h}
              </label>
            );
          })}
        </div>
        {err('turneu.harti') && <p className="text-red-400 text-xs mt-1">{errors['turneu.harti']}</p>}
      </div>

      {/* Zile - Checkbox */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Zile Disponibile <span className="text-orange-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {turneuData.zile.map((z) => {
            const selected = turneu.zile.includes(z);
            return (
              <label
                key={z}
                className={`cursor-pointer px-3 py-1.5 rounded-lg border text-sm font-medium transition-all
                  ${selected
                    ? 'bg-gray-600 border-gray-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {
                    dispatch({ type: 'TOGGLE_ZI', zi: z });
                    handleBlur('turneu.zile');
                  }}
                  className="sr-only"
                />
                {z}
              </label>
            );
          })}
        </div>
        {err('turneu.zile') && <p className="text-red-400 text-xs mt-1">{errors['turneu.zile']}</p>}
      </div>
    </div>
  );
}
