import { useFormState, useFormDispatch } from "../context/FormContext";
import potiuni from "../data/potiuni.json";
import semne from "../data/semne.json";

export default function Step3() {
  const { valori, errors, touched } = useFormState();
  const dispatch = useFormDispatch();

  return (
    <div>
      <h2>Pregatire</h2>

      <p>Potiuni:</p>
      {potiuni.map(p => (
        <label key={p}>
          <input
            type="checkbox"
            checked={valori.potiuni.includes(p)}
            onChange={() => dispatch({ type:"TOGGLE_CHECKBOX", field:"potiuni", value:p })}
          />
          {p}
        </label>
      ))}

      {touched.potiuni && errors.potiuni && <p>{errors.potiuni}</p>}

      <p>Semne:</p>
      {semne.map(s => (
        <label key={s}>
          <input
            type="checkbox"
            checked={valori.semne.includes(s)}
            onChange={() => dispatch({ type:"TOGGLE_CHECKBOX", field:"semne", value:s })}
          />
          {s}
        </label>
      ))}

      {touched.semne && errors.semne && <p>{errors.semne}</p>}

      <input
        type="range"
        min="0"
        max="100"
        value={valori.nivelPregatire}
        onChange={e => dispatch({ type:"SET_FIELD", field:"nivelPregatire", value:e.target.value })}
      />

      <select
        value={valori.sabie}
        onChange={e => dispatch({ type:"SET_FIELD", field:"sabie", value:e.target.value })}
      >
        <option value="">Alege sabie</option>
        <option value="steel">Steel</option>
        <option value="silver">Silver</option>
      </select>
    </div>
  );
}