export default function Field({ label, error, touched, children }) {
  return (
    <div className="field-wrap">
      <label className="field-label">{label}</label>
      {children}
      {touched && error ? <p className="field-error">{error}</p> : null}
    </div>
  );
}