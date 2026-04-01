import { useFormState, useFormDispatch } from "../../context/hooks";
import { validateStep } from "../../utils/validators";
import options from "../../data/optiuni.json";

export default function Step3Extras() {
  const { fields, touched } = useFormState();
  const dispatch = useFormDispatch();
  const errors = validateStep(fields, 2);

  function handleToggleExtra(value) {
    dispatch({ type: "TOGGLE_EXTRA", value });
    dispatch({ type: "TOUCH_FIELD", field: "extras" });
  }

  function handleBudgetChange(e) {
    dispatch({
      type: "SET_FIELD",
      field: "budget",
      value: Number(e.target.value),
    });
    dispatch({ type: "TOUCH_FIELD", field: "budget" });
  }

  function handleRequestsChange(e) {
    dispatch({
      type: "SET_FIELD",
      field: "specialRequests",
      value: e.target.value,
    });
  }

  return (
    <div className="step">
      <h2 className="step-title">Extra & Preferinte</h2>
      <p className="step-subtitle">Personalizeaza experienta ta</p>

      <div className="form-group">
        <label className="form-label">Extra-uri dorite * (minim 1)</label>
        <div className="checkbox-group">
          {options.extras.map((extra) => {
            const isChecked = fields.extras.includes(extra.value);
            return (
              <label
                key={extra.value}
                className={`checkbox-card ${isChecked ? "checkbox-card-active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleExtra(extra.value)}
                />
                <span>{extra.label}</span>
              </label>
            );
          })}
        </div>
        {touched.extras && errors.extras && (
          <span className="error-msg">{errors.extras}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">
          Budget estimat: <strong>{fields.budget} MDL</strong>
        </label>
        <input
          type="range"
          className="form-range"
          name="budget"
          min={100}
          max={5000}
          step={100}
          value={fields.budget}
          onChange={handleBudgetChange}
        />
        <div className="range-labels">
          <span>100 MDL</span>
          <span>5000 MDL</span>
        </div>
        {touched.budget && errors.budget && (
          <span className="error-msg">{errors.budget}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Cerinte speciale</label>
        <textarea
          className="form-textarea"
          name="specialRequests"
          value={fields.specialRequests}
          onChange={handleRequestsChange}
          placeholder="Ex: Aniversare, aranjament special, alergii..."
          rows={4}
        />
      </div>
    </div>
  );
}
