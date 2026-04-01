import Field from "../components/Field";
import { useFormDispatch, useFormState } from "../context/FormContext";
import countries from "../data/countries.json";
import tripTypes from "../data/tripTypes.json";

export default function StepTrip({ errors }) {
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
      <h2>Trip details</h2>
      <p className="section-text">Choose destination, trip type, budget and travel period.</p>

      <div className="form-grid">
        <Field label="Destination country" error={errors.country} touched={touched.country}>
          <select
            className={touched.country && errors.country ? "input error" : "input"}
            value={values.country}
            onChange={(e) => setField("country", e.target.value)}
            onBlur={() => touchField("country")}
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Trip type" error={errors.tripType} touched={touched.tripType}>
          <div className="radio-grid">
            {tripTypes.map((type) => (
              <label
                key={type.id}
                className={`choice-card ${values.tripType === type.label ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="tripType"
                  checked={values.tripType === type.label}
                  onChange={() => setField("tripType", type.label)}
                  onBlur={() => touchField("tripType")}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
          {touched.tripType && errors.tripType ? (
            <p className="field-error">{errors.tripType}</p>
          ) : null}
        </Field>

        <Field label={`Budget: $${values.budget}`} error={errors.budget} touched={touched.budget}>
          <input
            className={touched.budget && errors.budget ? "input error" : "input"}
            type="range"
            min="300"
            max="6000"
            step="100"
            value={values.budget}
            onChange={(e) => setField("budget", Number(e.target.value))}
            onBlur={() => touchField("budget")}
          />
        </Field>

        <Field label="Start date" error={errors.startDate} touched={touched.startDate}>
          <input
            className={touched.startDate && errors.startDate ? "input error" : "input"}
            type="date"
            value={values.startDate}
            onChange={(e) => setField("startDate", e.target.value)}
            onBlur={() => touchField("startDate")}
          />
        </Field>

        <Field label="End date" error={errors.endDate} touched={touched.endDate}>
          <input
            className={touched.endDate && errors.endDate ? "input error" : "input"}
            type="date"
            value={values.endDate}
            onChange={(e) => setField("endDate", e.target.value)}
            onBlur={() => touchField("endDate")}
          />
        </Field>
      </div>
    </div>
  );
}