import { useFormState, useFormDispatch } from "../context/FormContext";

export default function Review() {
  const { valori, trimis } = useFormState();
  const dispatch = useFormDispatch();

  if (trimis) {
    return <h2>Contract trimis cu succes!</h2>;
  }

  return (
    <div>
      <h2>Review</h2>

      <p>Nume: {valori.nume}</p>
      <p>Descriere: {valori.descriere}</p>
      <p>Monstru: {valori.monstru}</p>
      <p>Potiuni: {valori.potiuni.join(", ")}</p>
      <p>Semne: {valori.semne.join(", ")}</p>

      <input
        type="number"
        placeholder="Recompensa"
        value={valori.recompensa}
        onChange={e => dispatch({ type:"SET_FIELD", field:"recompensa", value:e.target.value })}
      />

      <button onClick={() => dispatch({ type:"SUBMIT" })}>
        Submit
      </button>
    </div>
  );
}