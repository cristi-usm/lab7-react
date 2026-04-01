export default function ProgressBar({ currentStep, steps }) {
  return (
    <div className="progress-wrap">
      {steps.map((step, index) => {
        const status =
          index < currentStep ? "done" : index === currentStep ? "active" : "idle";

        return (
          <div key={step.id} className={`progress-item ${status}`}>
            <div className="progress-dot">{index + 1}</div>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}