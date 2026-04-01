import "./ProgressBar.css"

const steps = ["Profile", "Event", "Preferences", "Review"]

export default function ProgressBar({ step }) {
    const percentage = Math.round(((step - 1) / (steps.length - 1)) * 100)

    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-step-label">{steps[step - 1]}</span>
                <span className="progress-percentage">{percentage}%</span>
            </div>
            <div className="progress-track">
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="progress-steps">
                {steps.map((s, i) => (
                    <span
                        key={s}
                        className={`progress-dot-label ${i + 1 < step ? "done" : ""} ${i + 1 === step ? "active" : ""}`}
                    >
                        {s}
                    </span>
                ))}
            </div>
        </div>
    )
}