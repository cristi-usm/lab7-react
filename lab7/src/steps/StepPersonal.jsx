import Field from "../components/Field";
import { useFormDispatch, useFormState } from "../context/FormContext";

export default function StepPersonal({ errors }) {
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
      <h2>Personal information</h2>
      <p className="section-text">Complete your basic details before planning the trip.</p>

      <div className="form-grid">
        <Field label="Full name" error={errors.fullName} touched={touched.fullName}>
          <input
            className={touched.fullName && errors.fullName ? "input error" : "input"}
            type="text"
            value={values.fullName}
            onChange={(e) => setField("fullName", e.target.value)}
            onBlur={() => touchField("fullName")}
            placeholder="John Doe"
          />
        </Field>

        <Field label="Email" error={errors.email} touched={touched.email}>
          <input
            className={touched.email && errors.email ? "input error" : "input"}
            type="text"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => touchField("email")}
            placeholder="john@email.com"
          />
        </Field>

        <Field label="Birth date" error={errors.birthDate} touched={touched.birthDate}>
          <input
            className={touched.birthDate && errors.birthDate ? "input error" : "input"}
            type="date"
            value={values.birthDate}
            onChange={(e) => setField("birthDate", e.target.value)}
            onBlur={() => touchField("birthDate")}
          />
        </Field>

        <Field label="Travelers" error={errors.travelers} touched={touched.travelers}>
          <div className="counter-box">
            <button
              type="button"
              className="counter-btn"
              onClick={() => dispatch({ type: "DECREMENT_TRAVELERS" })}
            >
              -
            </button>

            <input
              className="input center"
              type="number"
              min="1"
              value={values.travelers}
              onChange={(e) => setField("travelers", Number(e.target.value) || 1)}
              onBlur={() => touchField("travelers")}
            />

            <button
              type="button"
              className="counter-btn"
              onClick={() => dispatch({ type: "INCREMENT_TRAVELERS" })}
            >
              +
            </button>
          </div>
        </Field>
      </div>
    </div>
  );
}