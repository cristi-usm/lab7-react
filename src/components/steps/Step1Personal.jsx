import { useFormState, useFormDispatch } from "../../context/hooks";
import { validateStep } from "../../utils/validators";
import "./step1.css";

export default function Step1Personal() {
  const { fields, touched } = useFormState();
  const dispatch = useFormDispatch();
  const errors = validateStep(fields, 0);

  function handleChange(e) {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  }

  function handleBlur(e) {
    dispatch({ type: "TOUCH_FIELD", field: e.target.name });
  }

  function getFieldClass(fieldName) {
    return `form-input ${touched[fieldName] && errors[fieldName] ? "input-error" : ""}`;
  }

  return (
    <div className="step">
      <h2 className="step-title">Date Personale</h2>
      <p className="step-subtitle">Informatii despre tine</p>

      <div className="form-group">
        <label className="form-label">Nume complet *</label>
        <input
          className={getFieldClass("name")}
          type="text"
          name="name"
          value={fields.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: Andrei Popescu"
        />
        {touched.name && errors.name && (
          <span className="error-msg">{errors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Email *</label>
        <input
          className={getFieldClass("email")}
          type="text"
          name="email"
          value={fields.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: andrei@email.com"
        />
        {touched.email && errors.email && (
          <span className="error-msg">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Telefon *</label>
        <input
          className={getFieldClass("phone")}
          type="text"
          name="phone"
          value={fields.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: +40712345678"
        />
        {touched.phone && errors.phone && (
          <span className="error-msg">{errors.phone}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Varsta *</label>
        <input
          className={getFieldClass("age")}
          type="number"
          name="age"
          value={fields.age}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: 23"
          min={18}
          max={99}
        />
        {touched.age && errors.age && (
          <span className="error-msg">{errors.age}</span>
        )}
      </div>
    </div>
  );
}
