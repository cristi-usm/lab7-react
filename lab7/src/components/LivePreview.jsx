import { useFormState } from "../context/FormContext";

export default function LivePreview() {
  const { values } = useFormState();

  return (
    <aside className="preview-panel">
      <p className="preview-tag">Live Preview</p>
      <h2>{values.fullName || "Your travel card"}</h2>
      <p className="preview-mail">{values.email}</p>

      <div className="preview-card">
        <div>
          <span>Destination</span>
          <strong>{values.country || "Not selected"}</strong>
        </div>
        <div>
          <span>Trip type</span>
          <strong>{values.tripType || "Not selected"}</strong>
        </div>
        <div>
          <span>Travelers</span>
          <strong>{values.travelers}</strong>
        </div>
        <div>
          <span>Budget</span>
          <strong>${values.budget}</strong>
        </div>
        <div>
          <span>Dates</span>
          <strong>
            {values.startDate || "-"} to {values.endDate || "-"}
          </strong>
        </div>
      </div>

      <div className="preview-list-box">
        <h3>Chosen extras</h3>
        {values.extras.length > 0 ? (
          <ul className="preview-list">
            {values.extras.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">No extras selected yet</p>
        )}
      </div>

      <div className="preview-note-box">
        <h3>Notes</h3>
        <p>{values.notes || "No notes added yet"}</p>
      </div>
    </aside>
  );
}