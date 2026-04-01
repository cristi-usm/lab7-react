import { useFormDispatchContext, useFormStateContext } from "../context/FormContext.jsx"
import "./Bio.css"
import colors from "../data/colors.json"

export default function Bio() {
    const dispatch = useFormDispatchContext()
    const { name, email, color } = useFormStateContext()

    const handleNext = () => {
        dispatch({ type: "VALIDATE_STEP" })

        const hasErrors =
            !name.value ||
            !email.value ||
            !email.value.includes("@") ||
            !color.value

        if (!hasErrors) {
            dispatch({ type: "SET_STEP", step: 2 })
        }
    }

    return (
        <div className="bio-container">
            <h1>Build your profile!</h1>
            <h2>Include your personal details</h2>

            <div className="input-container">
                <p>Type your name</p>
                <input
                    value={name.value}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
                    onBlur={() => dispatch({ type: "TOUCH_FIELD", field: "name" })}
                />
                {name.touched && !name.value && <p className="error">You need to complete this!</p>}
            </div>

            <div className="input-container">
                <p>Type your email</p>
                <input
                    value={email.value}
                    onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
                    onBlur={() => dispatch({ type: "TOUCH_FIELD", field: "email" })}
                />
                {email.touched && !email.value && <p className="error">You need to complete this with a valid mail!</p>}
                {email.touched && email.value && !email.value.includes("@") && (
                    <p className="error">Email invalid!</p>
                )}
            </div>

            <div className="input-container">
                <p>Event color</p>
                <div className="colors-list">
                    {colors.map((c) => (
                        <button
                            key={c.color}
                            className={`color-circle ${color.value === c.color ? "selected" : ""}`}
                            style={{ background: c.color }}
                            title={c.name}
                            onClick={() => {
                                dispatch({ type: "SET_FIELD", field: "color", value: c.color })
                                dispatch({ type: "TOUCH_FIELD", field: "color" })
                            }}
                        />
                    ))}
                </div>
                {color.touched && !color.value && <p className="error">Select a color!</p>}
            </div>

            <div className="buttons-container">
                <button className="btn-next" onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}