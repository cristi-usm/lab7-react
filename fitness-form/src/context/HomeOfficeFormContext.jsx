import { createContext, useContext, useReducer } from 'react'

const FormStateContext = createContext(undefined)
const FormDispatchContext = createContext(undefined)

const initialFormData = {
  fullName: '',
  email: '',
  startDate: '',
  roomType: '',
  budget: '',
  focusLevel: 5,
  workMode: '',
  equipment: [],
  colorTheme: '',
  notes: '',
}

const initialTouched = {
  fullName: false,
  email: false,
  startDate: false,
  roomType: false,
  budget: false,
  focusLevel: false,
  workMode: false,
  equipment: false,
  colorTheme: false,
  notes: false,
}

const initialState = {
  currentStep: 0,
  submitted: false,
  formData: initialFormData,
  touched: initialTouched,
}

function homeOfficeFormReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { field, value } = action.payload
      return {
        ...state,
        formData: {
          ...state.formData,
          [field]: value,
        },
      }
    }

    case 'TOUCH_FIELD': {
      const field = action.payload
      return {
        ...state,
        touched: {
          ...state.touched,
          [field]: true,
        },
      }
    }

    case 'VALIDATE_STEP': {
      const nextTouched = { ...state.touched }

      action.payload.fields.forEach((field) => {
        nextTouched[field] = true
      })

      return {
        ...state,
        touched: nextTouched,
      }
    }

    case 'SET_STEP': {
      return {
        ...state,
        currentStep: action.payload,
      }
    }

    case 'TOGGLE_CHECKBOX': {
      const { field, value } = action.payload
      const currentValues = state.formData[field]

      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value]

      return {
        ...state,
        formData: {
          ...state.formData,
          [field]: nextValues,
        },
      }
    }

    case 'SUBMIT': {
      return {
        ...state,
        submitted: true,
      }
    }

    case 'RESET': {
      return initialState
    }

    default:
      return state
  }
}

export function HomeOfficeFormProvider({ children }) {
  const [state, dispatch] = useReducer(homeOfficeFormReducer, initialState)

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  )
}

export function useFormState() {
  const context = useContext(FormStateContext)

  if (context === undefined) {
    throw new Error('useFormState must be used inside HomeOfficeFormProvider')
  }

  return context
}

export function useFormDispatch() {
  const context = useContext(FormDispatchContext)

  if (context === undefined) {
    throw new Error('useFormDispatch must be used inside HomeOfficeFormProvider')
  }

  return context
}
