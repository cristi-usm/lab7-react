export default function Navigation({ step, onBack, onNext, onSubmit }) {
  return (
    <div className="nav-actions">
      <button type="button" className="ghost-btn" onClick={onBack} disabled={step === 0}>
        Back
      </button>

      {step < 3 ? (
        <button type="button" className="primary-btn" onClick={onNext}>
          Next
        </button>
      ) : (
        <button type="button" className="primary-btn" onClick={onSubmit}>
          Submit plan
        </button>
      )}
    </div>
  );
}