import Field from "../components/Field";
import { useFormDispatch, useFormState } from "../context/FormContext";
import extras from "../data/extras.json";

export default function StepExtras({ errors }) {
  const { values, touched } = useFormState();
  const dispatch = useFormDispatch();

  const setField = (name, value) => {
    dispatch({ type: "SET_FIELD", payload: { name, value } });
  };

  const touchField = (name) => {
    dispatch({ type: "TOUCH_FIELD", payload: name });
  };

  return (
    <div>
      <h2>Extras and preferences</h2>
      <p className="section-text">Choose at least 2 extras, add notes and accept the terms.</p>

      <Field label="Choose extras" error={errors.extras} touched={touched.extras}>
        <div className="checkbox-grid">
          {extras.map((item) => (
            <label
              key={item.id}
              className={`check-card ${values.extras.includes(item.label) ? "selected" : ""}`}
            >
              <input
                type="checkbox"
                checked={values.extras.includes(item.label)}
                onChange={() => dispatch({ type: "TOGGLE_EXTRA", payload: item.label })}
                onBlur={() => touchField("extras")}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Additional notes" error={errors.notes} touched={touched.notes}>
        <textarea
          className="input textarea"
          rows="5"
          value={values.notes}
          onChange={(e) => setField("notes", e.target.value)}
          onBlur={() => touchField("notes")}
          placeholder="Tell us your preferences..."
        />
      </Field>

      <label className={`terms-row ${touched.agreeTerms && errors.agreeTerms ? "error-border" : ""}`}>
        <input
          type="checkbox"
          checked={values.agreeTerms}
          onChange={(e) => setField("agreeTerms", e.target.checked)}
          onBlur={() => touchField("agreeTerms")}
        />
        <span>I agree with the travel planner terms and conditions.</span>
      </label>

      {touched.agreeTerms && errors.agreeTerms ? (
        <p className="field-error">{errors.agreeTerms}</p>
      ) : null}
    </div>
  );
}