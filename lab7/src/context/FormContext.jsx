import { createContext, useContext, useReducer } from 'react';
import { formReducer, initialState } from './formReducer';

const StateContext = createContext(null);
const DispatchContext = createContext(null);

export function FormProvider({ children }) {
    const [state, dispatch] = useReducer(formReducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
}

export function useFormState() {
    const ctx = useContext(StateContext);
    if (!ctx) throw new Error('useFormState must be used within FormProvider');
    return ctx;
}

export function useFormDispatch() {
    const ctx = useContext(DispatchContext);
    if (!ctx) throw new Error('useFormDispatch must be used within FormProvider');
    return ctx;
}
