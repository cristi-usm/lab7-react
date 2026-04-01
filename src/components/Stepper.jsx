export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="stepper-item">
            <div
              className={`stepper-circle ${
                isCompleted ? "completed" : isCurrent ? "current" : ""
              }`}
            >
              {isCompleted ? "✓" : index + 1}
            </div>
            <span
              className={`stepper-label ${isCurrent ? "label-current" : ""}`}
            >
              {label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line ${isCompleted ? "line-done" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
