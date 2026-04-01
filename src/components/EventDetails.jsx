import { useFormDispatchContext, useFormStateContext } from "../context/FormContext.jsx"
import "./EventDetails.css"
import events from "../data/events.json"

export default function EventDetails() {
    const dispatch = useFormDispatchContext()
    const { event, members, date } = useFormStateContext()

    const handleNext = () => {
        dispatch({ type: "VALIDATE_STEP" })

        const hasErrors =
            !event.value ||
            !date.value

        if (!hasErrors) {
            dispatch({ type: "SET_STEP", step: 3 })
        }
    }

    const handleBack = () => {
        dispatch({ type: "SET_STEP", step: 1 })
    }

    return (
        <div className="ed-container">
            <h1>Event details</h1>
            <h2>Tell us about your party</h2>

            <div className="input-group">
                <label>Type of event</label>
                <select
                    value={event.value}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "event", value: e.target.value })}
                    onBlur={() => dispatch({ type: "TOUCH_FIELD", field: "event" })}
                >
                    <option value="">— Select —</option>
                    {events.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                    ))}
                </select>
                {event.touched && !event.value && (
                    <p className="error">Please select an event type!</p>
                )}
            </div>

            <div className="input-group">
                <label>Number of members — <strong>{members.value}</strong></label>
                <div className="range-row">
                    <input
                        type="range"
                        min="1"
                        max="200"
                        step="1"
                        value={members.value}
                        onChange={(e) => dispatch({ type: "SET_FIELD", field: "members", value: Number(e.target.value) })}
                    />
                    <span className="range-val">{members.value}</span>
                </div>
                <div className="range-labels">
                    <span>1</span><span>200</span>
                </div>
            </div>

            <div className="input-group">
                <label>Event date</label>
                <input
                    type="date"
                    value={date.value}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "date", value: e.target.value })}
                    onBlur={() => dispatch({ type: "TOUCH_FIELD", field: "date" })}
                />
                {date.touched && !date.value && (
                    <p className="error">Please select a date!</p>
                )}
            </div>

            <div className="buttons-container">
                <button className="btn-back" onClick={handleBack}>Back</button>
                <button className="btn-next" onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}