export default function StepIndicator({ labels, currentStep }) {
  return (
    <div className="stepper-wrapper">
      <div className="stepper-progress-track">
        <div
          className="stepper-progress-fill"
          style={{
            width: `${(currentStep / (labels.length - 1)) * 100}%`,
          }}
        />
      </div>

      <div className="stepper-list">
        {labels.map((label, index) => {
          let status = 'upcoming'

          if (index < currentStep) {
            status = 'done'
          }

          if (index === currentStep) {
            status = 'current'
          }

          return (
            <div key={label} className={`stepper-item ${status}`}>
              <div className="stepper-dot">{index + 1}</div>
              <p>{label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
