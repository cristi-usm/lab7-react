import { useFormState } from "../context/hooks";
import options from "../data/optiuni.json";
import "../components/steps/Live.css";

export default function LivePreview() {
  const { fields, currentStep } = useFormState();

  const tableLabel =
    options.tableTypes.find((t) => t.value === fields.tableType)?.label || "—";

  const extrasLabels =
    fields.extras.length > 0
      ? fields.extras
          .map((e) => options.extras.find((o) => o.value === e)?.label)
          .join(", ")
      : "—";

  return (
    <div className="live-preview">
      <h2 className="preview-title">Preview Rezervare</h2>

      <div className="preview-card">
        <div className="preview-avatar">
          {fields.name ? fields.name[0].toUpperCase() : "?"}
        </div>

        <h3 className="preview-name">{fields.name || "Numele tau"}</h3>
        <p className="preview-email">{fields.email || "email@exemplu.com"}</p>

        <div className="preview-divider" />

        <div className="preview-row">
          <span className="preview-icon">Loc: </span>
          <span>{tableLabel}</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">Persoane: </span>
          <span>{fields.guests}</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">Data: </span>
          <span>{fields.date || "—"}</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">Ora: </span>
          <span>{fields.time || "—"}</span>
        </div>

        <div className="preview-divider" />

        <div className="preview-row">
          <span className="preview-icon">Extra: </span>
          <span>{extrasLabels}</span>
        </div>

        <div className="preview-row">
          <span className="preview-icon">Buget: </span>
          <span>{fields.budget} MDL</span>
        </div>

        {fields.specialRequests && (
          <div className="preview-note">Cereri: {fields.specialRequests}</div>
        )}
      </div>

      <div className="preview-step-badge">Pasul {currentStep + 1} din 4</div>
    </div>
  );
}
