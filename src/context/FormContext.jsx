import { createContext, useContext, useReducer } from "react"

export const FormStateContext = createContext(null)
export const FormDispatchContext = createContext(null)

const initialForm = {
    step: 1,
    name: { value: "", touched: false },
    date: { value: "", touched: false },
    color: { value: "", touched: false },
    email: { value: "", touched: false },
    event: { value: "", touched: false },
    members: { value: 0, touched: false },
    preferences: { value: [], touched: false },
    comments: { value: "", touched: false },
    submitted: false
}

function formReducer(answers, action) {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...answers,
                [action.field]: {
                    value: action.value,
                    touched: answers[action.field].touched
                }
            }

        case "TOUCH_FIELD":
            return {
                ...answers,
                [action.field]: {
                    ...answers[action.field],
                    touched: true
                }
            }

        case "VALIDATE_STEP":
            if (answers.step === 1) {
                return {
                    ...answers,
                    name: { ...answers.name, touched: true },
                    email: { ...answers.email, touched: true },
                    color: { ...answers.color, touched: true }
                }
            } else if (answers.step === 2) {
                return {
                    ...answers,
                    event: { ...answers.event, touched: true },
                    members: { ...answers.members, touched: true },
                    date: { ...answers.date, touched: true }
                }
            } else if (answers.step === 3) {
                return {
                    ...answers,
                    preferences: { ...answers.preferences, touched: true },
                    comments: { ...answers.comments, touched: true }
                }
            }
            return answers

        case "SET_STEP":
            return {
                ...answers,
                step: action.step
            }

        case "RESET":
            return { ...initialForm }

        default:
            return answers

        case "SUBMIT":
          return {
              ...answers,
              submitted: true
        }
    }
}

export default function FormProvider({ children }) {
    const [form, dispatch] = useReducer(formReducer, initialForm)

    return (
        <FormStateContext.Provider value={form}>
            <FormDispatchContext.Provider value={dispatch}>
                {children}
            </FormDispatchContext.Provider>
        </FormStateContext.Provider>
    )
}

export function useFormStateContext() {
    return useContext(FormStateContext)
}

export function useFormDispatchContext() {
    return useContext(FormDispatchContext)
}