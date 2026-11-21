import { createContext, useContext, useReducer } from 'react'

export const initialForm = {
  traveler: { name: '', email: '', travelers: 2, style: '' },
  trip: { destination: '', startDate: '', endDate: '', budget: 1200 },
  experience: { activities: [], accommodation: '', notes: '', newsletter: false },
  currentStep: 0,
  touched: {},
  submitted: false
}

const StateContext = createContext(null)
const DispatchContext = createContext(null)

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.section]: { ...state[action.section], [action.field]: action.value } }
    case 'TOUCH_FIELD':
      return { ...state, touched: { ...state.touched, [action.field]: true } }
    case 'VALIDATE_STEP':
      return { ...state, touched: { ...state.touched, ...Object.fromEntries(action.fields.map((field) => [field, true])) } }
    case 'SET_STEP':
      return { ...state, currentStep: action.step }
    case 'TOGGLE_ACTIVITY': {
      const activities = state.experience.activities.includes(action.activity)
        ? state.experience.activities.filter((item) => item !== action.activity)
        : [...state.experience.activities, action.activity]
      return { ...state, experience: { ...state.experience, activities } }
    }
    case 'SUBMIT':
      return { ...state, submitted: true }
    case 'RESET':
      return initialForm
    default:
      return state
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialForm)
  return <StateContext.Provider value={state}><DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider></StateContext.Provider>
}

export const useFormState = () => useContext(StateContext)
export const useFormDispatch = () => useContext(DispatchContext)
