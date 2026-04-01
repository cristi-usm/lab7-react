import roluri from '../../data/roluri.json';
import { useFormState, useFormDispatch } from '../../hooks/useForm';

export default function JucatoriStep() {
  const { jucatori, errors, touched } = useFormState();
  const dispatch = useFormDispatch();

  const err = (camp) => touched[camp] && errors[camp];

  const handleChange = (id, camp, valoare) => {
    dispatch({ type: 'SET_JUCATOR', id, camp, valoare });
  };

  const handleBlur = (camp) => {
    dispatch({ type: 'TOUCH_FIELD', camp });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-1">Roster Jucători</h2>
      <p className="text-gray-500 text-sm mb-4">Adaugă cei 5 jucători ai echipei tale</p>

      {errors['jucatori.roluri'] && touched['jucatori.roluri'] && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 text-sm">
          ⚠️ {errors['jucatori.roluri']}
        </div>
      )}

      {jucatori.map((j, i) => (
        <div key={j.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-xs font-bold text-orange-400">
              {i + 1}
            </div>
            <span className="text-gray-400 text-sm font-medium">Jucător #{i + 1}</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Nickname */}
            <div className="col-span-1">
              <label className="block text-xs text-gray-500 mb-1">
                Nickname <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                value={j.nickname}
                onChange={(e) => handleChange(j.id, 'nickname', e.target.value)}
                onBlur={() => handleBlur(`jucatori.${i}.nickname`)}
                placeholder="ex: s1mple"
                className={`w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm border outline-none transition-colors
              ${err(`jucatori.${i}.nickname`) ? 'border-red-500' : touched[`jucatori.${i}.nickname`] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
                `}
              />
              {err(`jucatori.${i}.nickname`) && (
                <p className="text-red-400 text-xs mt-0.5">{errors[`jucatori.${i}.nickname`]}</p>
              )}
            </div>

            {/* Rol */}
            <div className="col-span-1">
              <label className="block text-xs text-gray-500 mb-1">
                Rol <span className="text-orange-500">*</span>
              </label>
              <select
                value={j.rol}
                onChange={(e) => handleChange(j.id, 'rol', e.target.value)}
                onBlur={() => handleBlur(`jucatori.${i}.rol`)}
                className={`w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm border outline-none transition-colors
                ${!touched[`jucatori.${i}.nickname`] 
                ? 'border-gray-700' 
                  : j.nickname.trim().length >= 2 
                    ? 'border-green-500' 
                    : 'border-red-500'}
                `}
              >
                <option value="">-- Rol --</option>
                {roluri.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {err(`jucatori.${i}.rol`) && (
                <p className="text-red-400 text-xs mt-0.5">{errors[`jucatori.${i}.rol`]}</p>
              )}
            </div>

            {/* Varsta */}
            <div className="col-span-1">
              <label className="block text-xs text-gray-500 mb-1">
                Vârstă <span className="text-orange-500">*</span>
              </label>
              <input
                type="number"
                value={j.varsta}
                onChange={(e) => handleChange(j.id, 'varsta', e.target.value)}
                onBlur={() => handleBlur(`jucatori.${i}.varsta`)}
                placeholder="18"
                min={14}
                max={99}
                className={`w-full bg-gray-900 text-white rounded-lg px-3 py-2 text-sm border outline-none transition-colors
                 ${err(`jucatori.${i}.varsta`) ? 'border-red-500' : touched[`jucatori.${i}.varsta`] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
                `}
              />
              {err(`jucatori.${i}.varsta`) && (
                <p className="text-red-400 text-xs mt-0.5">{errors[`jucatori.${i}.varsta`]}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
