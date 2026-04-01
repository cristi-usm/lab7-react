import { createContext, useContext, useReducer } from "react";

const StateContext = createContext();
const DispatchContext = createContext();

const initialState = {
  pasCurent: 1,
  trimis: false,
  valori: {
    nume: "",
    descriere: "",
    regiune: "",
    data: "",
    monstru: "",
    dificultate: 1,
    abilitati: [],
    potiuni: [],
    semne: [],
    nivelPregatire: 50,
    sabie: "",
    recompensa: "",
    bonusuri: []
  },
  errors: {},
  touched: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        valori: { ...state.valori, [action.field]: action.value }
      };

    case "TOUCH_FIELD":
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true }
      };

    case "TOGGLE_CHECKBOX": {
      const lista = state.valori[action.field];
      return {
        ...state,
        valori: {
          ...state.valori,
          [action.field]: lista.includes(action.value)
            ? lista.filter(v => v !== action.value)
            : [...lista, action.value]
        }
      };
    }

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "SET_STEP":
      return { ...state, pasCurent: action.step };

    case "SUBMIT":
      return { ...state, trimis: true };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export const useFormState = () => useContext(StateContext);
export const useFormDispatch = () => useContext(DispatchContext);