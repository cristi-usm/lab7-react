import { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

export const StateContext = createContext(null);
export const DispatchContext = createContext(null);

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext value={state}>
      <DispatchContext value={dispatch}>
        {children}
      </DispatchContext >
    </StateContext>
  );
}
