import tari from '../../data/tari.json';
import { useFormState, useFormDispatch } from '../../hooks/useForm';

export default function EchipaStep() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { echipa, errors, touched } = state;

  const err = (camp) => touched[camp] && errors[camp];

  const handleChange = (camp, valoare) => {
    dispatch({ type: 'SET_ECHIPA', camp, valoare });
  };

  const handleBlur = (camp) => {
    dispatch({ type: 'TOUCH_FIELD', camp });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-white mb-1">Date Echipă</h2>
      <p className="text-gray-500 text-sm mb-4">Completează informațiile de bază ale echipei tale CS2</p>

      {/* Nume */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Nume Echipă <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          value={echipa.nume}
          onChange={(e) => handleChange('nume', e.target.value)}
          onBlur={() => handleBlur('echipa.nume')}
          placeholder="ex: Team Inferno"
          className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 border outline-none transition-colors
            ${err('echipa.nume') ? 'border-red-500' : touched['echipa.nume'] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
          `}
        />
        {err('echipa.nume') && <p className="text-red-400 text-xs mt-1">{errors['echipa.nume']}</p>}
      </div>

      {/* Tara */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Țară <span className="text-orange-500">*</span>
        </label>
        <select
          value={echipa.tara}
          onChange={(e) => handleChange('tara', e.target.value)}
          onBlur={() => handleBlur('echipa.tara')}
          className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 border outline-none transition-colors
            ${err('echipa.tara') ? 'border-red-500' : touched['echipa.tara'] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
          `}
        >
          <option value="">Selectează țara</option>
          {tari.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {err('echipa.tara') && <p className="text-red-400 text-xs mt-1">{errors['echipa.tara']}</p>}
      </div>

      {/* Culoare + Data */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Culoare Echipă
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={echipa.culoare}
              onChange={(e) => handleChange('culoare', e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-700 bg-gray-800 cursor-pointer p-1"
            />
            <span className="text-gray-400 text-sm font-mono">{echipa.culoare}</span>
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Data Înregistrare <span className="text-orange-500">*</span>
          </label>
          <input
            type="date"
            value={echipa.dataInregistrare}
            onChange={(e) => handleChange('dataInregistrare', e.target.value)}
            onBlur={() => handleBlur('echipa.dataInregistrare')}
            className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 border outline-none transition-colors
              ${err('echipa.dataInregistrare') ? 'border-red-500' : touched['echipa.dataInregistrare'] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
            `}
          />
          {err('echipa.dataInregistrare') && (
            <p className="text-red-400 text-xs mt-1">{errors['echipa.dataInregistrare']}</p>
          )}
        </div>
      </div>

      {/* Descriere */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Descriere Echipă <span className="text-orange-500">*</span>
        </label>
        <textarea
          value={echipa.descriere}
          onChange={(e) => handleChange('descriere', e.target.value)}
          onBlur={() => handleBlur('echipa.descriere')}
          placeholder="Povestea echipei tale, stilul de joc, obiective..."
          rows={3}
          className={`w-full bg-gray-800 text-white rounded-lg px-4 py-2.5 border outline-none transition-colors resize-none
            ${err('echipa.descriere') ? 'border-red-500' : touched['echipa.descriere'] ? 'border-green-500' : 'border-gray-700 focus:border-orange-500'}
          `}
        />
        {err('echipa.descriere') && (
          <p className="text-red-400 text-xs mt-1">{errors['echipa.descriere']}</p>
        )}
      </div>
    </div>
  );
}