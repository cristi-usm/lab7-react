import { useFormState, useFormDispatch } from "../../context/hooks";
import { validateStep } from "../../utils/validators";
import options from "../../data/optiuni.json";
import "./Step2.css";

export default function Step2Table() {
  const { fields, touched } = useFormState();
  const dispatch = useFormDispatch();
  const errors = validateStep(fields, 1);

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
      <h2 className="step-title">Alegerea Mesei</h2>
      <p className="step-subtitle">Configureaza rezervarea ta</p>

      <div className="form-group">
        <label className="form-label">Tip masa *</label>
        <div className="radio-group">
          {options.tableTypes.map((type) => (
            <label
              key={type.value}
              className={`radio-card ${fields.tableType === type.value ? "radio-card-active" : ""}`}
            >
              <input
                type="radio"
                name="tableType"
                value={type.value}
                checked={fields.tableType === type.value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
        {touched.tableType && errors.tableType && (
          <span className="error-msg">{errors.tableType}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Numar de persoane *</label>
        <input
          className={getFieldClass("guests")}
          type="number"
          name="guests"
          value={fields.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ex: 4"
          min={1}
          max={20}
        />
        {touched.guests && errors.guests && (
          <span className="error-msg">{errors.guests}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Data rezervarii *</label>
        <input
          className={getFieldClass("date")}
          type="date"
          name="date"
          value={fields.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.date && errors.date && (
          <span className="error-msg">{errors.date}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Ora sosirii *</label>
        <select
          className={getFieldClass("time")}
          name="time"
          value={fields.time}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">-- Alege ora --</option>
          {options.timeSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
        {touched.time && errors.time && (
          <span className="error-msg">{errors.time}</span>
        )}
      </div>
    </div>
  );
}
