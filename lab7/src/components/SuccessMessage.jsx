import { useFormDispatch, useFormState } from "../context/FormContext";

export default function SuccessMessage() {
  const { values } = useFormState();
  const dispatch = useFormDispatch();

  return (
    <div className="success-screen">
      <div className="success-card">
        <p className="success-badge">Submitted</p>
        <h1>Travel plan sent successfully</h1>
        <p>
          Thank you, <strong>{values.fullName}</strong>. Your trip request for{" "}
          <strong>{values.country}</strong> was saved.
        </p>
        <button className="primary-btn" onClick={() => dispatch({ type: "RESET" })}>
          Create another plan
        </button>
      </div>
    </div>
  );
}