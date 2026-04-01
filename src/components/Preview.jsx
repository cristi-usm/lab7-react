import { useFormStateContext } from "../context/FormContext.jsx"
import "./Preview.css"

export default function Preview() {
    const { name, email, color, event, date, members, preferences, comments } = useFormStateContext()

    const initials = name.value
        ? name.value.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
        : "?"

    return (
        <div className="preview-panel">
            <p className="preview-label">Live preview</p>

            <div className="preview-avatar" style={{ background: color.value || "#ddd" }}>
                {initials}
            </div>
            <p className="preview-name">{name.value || "—"}</p>
            <p className="preview-email">{email.value || "—"}</p>

            <hr className="preview-divider" />

            <div className="preview-row">
                <span className="preview-row-label">Color</span>
                <span className="preview-row-value">
                    {color.value
                        ? <><span className="color-dot" style={{ background: color.value }} />{color.value}</>
                        : "—"}
                </span>
            </div>
            <div className="preview-row">
                <span className="preview-row-label">Event</span>
                <span className="preview-row-value">{event.value || "—"}</span>
            </div>
            <div className="preview-row">
                <span className="preview-row-label">Date</span>
                <span className="preview-row-value">{date.value || "—"}</span>
            </div>
            <div className="preview-row">
                <span className="preview-row-label">Members</span>
                <span className="preview-row-value">{members.value}</span>
            </div>

            <hr className="preview-divider" />

            <p className="preview-section-label">Preferences</p>
            <div className="preview-chips">
                {preferences.value.length > 0
                    ? preferences.value.map((p) => (
                        <span key={p} className="chip">{p}</span>
                    ))
                    : <span style={{ fontSize: "13px", color: "#aaa" }}>—</span>}
            </div>

            {comments.value && (
                <>
                    <hr className="preview-divider" />
                    <p className="preview-section-label">Comments</p>
                    <p className="preview-comments">{comments.value}</p>
                </>
            )}
        </div>
    )
}