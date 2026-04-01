import { useFormState } from "../../context/hooks";
import options from "../../data/optiuni.json";

export default function Step4Review() {
  const { fields } = useFormState();

  const tableLabel =
    options.tableTypes.find((t) => t.value === fields.tableType)?.label || "—";

  const extrasLabels =
    fields.extras.length > 0
      ? fields.extras.map(
          (e) => options.extras.find((o) => o.value === e)?.label,
        )
      : [];

  return (
    <div className="step">
      <h2 className="step-title">Review Rezervare</h2>
      <p className="step-subtitle">Verifica datele inainte de confirmare</p>

      <div className="review-section">
        <h3 className="review-section-title">Date Personale</h3>

        <div className="review-row">
          <span className="review-label">Nume</span>
          <span className="review-value">{fields.name}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Email</span>
          <span className="review-value">{fields.email}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Telefon</span>
          <span className="review-value">{fields.phone}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Varsta</span>
          <span className="review-value">{fields.age} ani</span>
        </div>
      </div>

      <div className="review-section">
        <h3 className="review-section-title">Detalii Masa</h3>

        <div className="review-row">
          <span className="review-label">Tip masa</span>
          <span className="review-value">{tableLabel}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Persoane</span>
          <span className="review-value">{fields.guests}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Data</span>
          <span className="review-value">{fields.date}</span>
        </div>
        <div className="review-row">
          <span className="review-label">Ora</span>
          <span className="review-value">{fields.time}</span>
        </div>
      </div>

      <div className="review-section">
        <h3 className="review-section-title">Extra & Preferinte</h3>

        <div className="review-row">
          <span className="review-label">Extra-uri</span>
          <div className="review-tags">
            {extrasLabels.map((label, i) => (
              <span key={i} className="review-tag">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="review-row">
          <span className="review-label">Budget</span>
          <span className="review-value">{fields.budget} RON</span>
        </div>
        {fields.specialRequests && (
          <div className="review-row">
            <span className="review-label">Cerinte speciale</span>
            <span className="review-value">{fields.specialRequests}</span>
          </div>
        )}
      </div>
    </div>
  );
}
