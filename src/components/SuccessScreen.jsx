import { useFormDispatch } from "../context/hooks";

export default function SuccessScreen() {
  const dispatch = useFormDispatch();

  return (
    <div className="success-screen">
      <div className="success-card">
        <h2>Rezervare Confirmata!</h2>
        <p>
          Iti multumim! Rezervarea ta a fost inregistrata cu succes. Vei primi o
          confirmare pe email in scurt timp.
        </p>
        <button
          className="btn btn-submit"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Rezervare Noua
        </button>
      </div>
    </div>
  );
}
