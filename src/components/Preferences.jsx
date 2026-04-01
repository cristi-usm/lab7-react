import { useFormDispatchContext, useFormStateContext } from "../context/FormContext.jsx"
import "./Preferences.css"
import preferenceOptions from "../data/preferences.json"

export default function Preferences() {
    const dispatch = useFormDispatchContext()
    const { preferences, comments } = useFormStateContext()

    const togglePreference = (value) => {
        const current = preferences.value
        const updated = current.includes(value)
            ? current.filter((p) => p !== value)
            : [...current, value]

        dispatch({ type: "SET_FIELD", field: "preferences", value: updated })
        dispatch({ type: "TOUCH_FIELD", field: "preferences" })
    }

    const handleNext = () => {
        dispatch({ type: "VALIDATE_STEP" })

        const hasErrors = preferences.value.length < 2

        if (!hasErrors) {
            dispatch({ type: "SET_STEP", step: 4 })
        }
    }

    const handleBack = () => {
        dispatch({ type: "SET_STEP", step: 2 })
    }

    return (
        <div className="pref-container">
            <h1>Preferences</h1>
            <h2>Customize your party experience</h2>

            <div className="input-group">
                <label>
                    Party preferences{" "}
                    <span className="hint">(select at least 2)</span>
                </label>
                <div className="checkbox-grid">
                    {preferenceOptions.map((p) => {
                        const isChecked = preferences.value.includes(p.value)
                        return (
                            <label
                                key={p.value}
                                className={`checkbox-item ${isChecked ? "checked" : ""}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => togglePreference(p.value)}
                                />
                                <span>{p.label}</span>
                            </label>
                        )
                    })}
                </div>
                {preferences.touched && preferences.value.length < 2 && (
                    <p className="error">Please select at least 2 preferences!</p>
                )}
            </div>

            <div className="input-group">
                <label>Additional comments</label>
                <textarea
                    value={comments.value}
                    placeholder="Tell us any additional details..."
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "comments", value: e.target.value })}
                    onBlur={() => dispatch({ type: "TOUCH_FIELD", field: "comments" })}
                />
            </div>

            <div className="buttons-container">
                <button className="btn-back" onClick={handleBack}>Back</button>
                <button className="btn-next" onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}