import { useFormState } from "../context/FormContext";

export default function Preview() {
  const { valori } = useFormState();

  return (
    <div className="preview">
  <h2>CONTRACT</h2>

  <p><b>{valori.nume}</b></p>
  <p>{valori.descriere}</p>

  <hr />

  <p>Regiune: {valori.regiune}</p>
  <p>Monstru: {valori.monstru}</p>
  <p>Dificultate: {valori.dificultate}</p>

  <hr />

  <p>Potiuni: {valori.potiuni.join(", ")}</p>
  <p>Semne: {valori.semne.join(", ")}</p>

  <hr />

  <p><b>Recompensa: {valori.recompensa} gold</b></p>
</div>
  );
}