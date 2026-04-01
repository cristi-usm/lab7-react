import { useFormStateContext, useFormDispatchContext } from "../context/FormContext.jsx"
import "./Review.css"

export default function Review() {
    const dispatch = useFormDispatchContext()
    const { name, email, color, event, date, members, preferences, comments, submitted } = useFormStateContext()

    const initials = name.value
        ? name.value.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
        : "?"

    const formattedDate = date.value
        ? new Date(date.value).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric"
        })
        : "—"

    const dayName = date.value
        ? new Date(date.value).toLocaleDateString("en-GB", { weekday: "long" })
        : ""

    if (submitted) {
        return (
            <div className="success-container">
                <div className="success-icon">✓</div>
                <h2 className="success-title">You're all set!</h2>
                <p className="success-sub">Your event has been registered successfully.</p>
                <button
                    className="reset-btn"
                    onClick={() => dispatch({ type: "RESET" })}
                >
                    Start over
                </button>
            </div>
        )
    }

    return (
        <div className="review">
            <div className="review-hero">
                <div className="review-avatar" style={{ background: color.value || "#ddd" }}>
                    {initials}
                </div>
                <div>
                    <div className="review-hero-name">{name.value}</div>
                    <div className="review-hero-email">{email.value}</div>
                </div>
            </div>

            <div className="review-grid">
                <div className="review-card">
                    <div className="review-card-label">Party color</div>
                    <div className="review-card-value">
                        <span className="color-swatch" style={{ background: color.value }} />
                        {color.value || "—"}
                    </div>
                </div>

                <div className="review-card">
                    <div className="review-card-label">Event type</div>
                    <div className="review-card-value">{event.value || "—"}</div>
                </div>

                <div className="review-card">
                    <div className="review-card-label">Date</div>
                    <div className="review-card-value">{formattedDate}</div>
                    {dayName && <div className="review-card-sub">{dayName}</div>}
                </div>

                <div className="review-card">
                    <div className="review-card-label">Members</div>
                    <div className="review-card-value">{members.value} guests</div>
                </div>

                <div className="review-card full">
                    <div className="review-card-label">Preferences</div>
                    <div className="chips-row">
                        {preferences.value.length > 0
                            ? preferences.value.map((p) => (
                                <span key={p} className="chip">{p}</span>
                            ))
                            : <span className="review-card-sub">—</span>}
                    </div>
                </div>

                {comments.value && (
                    <div className="review-card full">
                        <div className="review-card-label">Comments</div>
                        <div className="review-comments">{comments.value}</div>
                    </div>
                )}
            </div>

            <div className="buttons-container">
                <button
                    className="reset-btn"
                    onClick={() => dispatch({ type: "RESET" })}
                >
                    Reset
                </button>
                <button
                    className="btn-next"
                    onClick={() => dispatch({ type: "SUBMIT" })}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}