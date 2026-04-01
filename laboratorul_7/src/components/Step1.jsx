import { useFormState, useFormDispatch } from "../context/FormContext";
import regiuni from "../data/regiuni.json";

export default function Step1() {
  const { valori, errors, touched } = useFormState();
  const dispatch = useFormDispatch();

  return (
    <div>
      <h2>Contract</h2>

      <input
        placeholder="Nume"
        value={valori.nume}
        onChange={e => dispatch({ type:"SET_FIELD", field:"nume", value:e.target.value })}
        onBlur={() => dispatch({ type:"TOUCH_FIELD", field:"nume" })}
      />
      {touched.nume && errors.nume && <p>{errors.nume}</p>}

      <textarea
        placeholder="Descriere"
        value={valori.descriere}
        onChange={e => dispatch({ type:"SET_FIELD", field:"descriere", value:e.target.value })}
        onBlur={() => dispatch({ type:"TOUCH_FIELD", field:"descriere" })}
      />
      {touched.descriere && errors.descriere && <p>{errors.descriere}</p>}

      <select
        value={valori.regiune}
        onChange={e => dispatch({ type:"SET_FIELD", field:"regiune", value:e.target.value })}
      >
        <option value="">Alege regiune</option>
        {regiuni.map(r => <option key={r}>{r}</option>)}
      </select>

      <input
        type="date"
        value={valori.data}
        onChange={e => dispatch({ type:"SET_FIELD", field:"data", value:e.target.value })}
      />
    </div>
  );
}