import { useFormState, useFormDispatch } from "../context/FormContext";
import monstri from "../data/monstri.json";

export default function Step2() {
  const { valori, errors, touched } = useFormState();
  const dispatch = useFormDispatch();

  return (
    <div>
      <h2>Monstru</h2>

      {monstri.map(m => (
        <label key={m.id}>
          <input
            type="radio"
            name="monstru"
            value={m.nume}
            checked={valori.monstru === m.nume}
            onChange={e => dispatch({ type:"SET_FIELD", field:"monstru", value:e.target.value })}
          />
          {m.nume}
        </label>
      ))}

      {touched.monstru && errors.monstru && <p>{errors.monstru}</p>}

      <input
        type="number"
        min="1"
        max="10"
        value={valori.dificultate}
        onChange={e => dispatch({ type:"SET_FIELD", field:"dificultate", value:e.target.value })}
      />

      <p>Abilitati:</p>
      {["Rapid","Invizibil","Puternic"].map(a => (
        <label key={a}>
          <input
            type="checkbox"
            checked={valori.abilitati.includes(a)}
            onChange={() => dispatch({ type:"TOGGLE_CHECKBOX", field:"abilitati", value:a })}
          />
          {a}
        </label>
      ))}

      {touched.abilitati && errors.abilitati && <p>{errors.abilitati}</p>}
    </div>
  );
}