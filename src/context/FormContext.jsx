import { createContext, useContext, useReducer } from 'react'
import { formReducer, initialState } from '../reducer/formReducer'

const StateContext = createContext()
const DispatchContext = createContext()

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useFormState = () => useContext(StateContext)
export const useFormDispatch = () => useContext(DispatchContext)
