import { createContext, useContext, useReducer } from "react";
import { appReducer, initialState, ACTIONS } from "./reducer";

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook de bază ─────────────────────────────────────────────────────────────

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext trebuie folosit în interiorul AppProvider");
  return ctx;
}

// ─── Hook cu acțiuni gata pregătite ──────────────────────────────────────────
// Componenetele apelează aceste funcții direct, fără să cunoască ACTIONS

export function useAppActions() {
  const { dispatch } = useAppContext();

  return {
    setPas:      (pas)         => dispatch({ type: ACTIONS.SET_PAS,      payload: pas }),
    setMarca:    (marca)       => dispatch({ type: ACTIONS.SET_MARCA,    payload: marca }),
    setModel:    (model)       => dispatch({ type: ACTIONS.SET_MODEL,    payload: model }),
    setAn:       (an)          => dispatch({ type: ACTIONS.SET_AN,       payload: an }),
    setMotor:    (motor)       => dispatch({ type: ACTIONS.SET_MOTOR,    payload: motor }),
    setFiltCat:  (cat)         => dispatch({ type: ACTIONS.SET_FILT_CAT, payload: cat }),
    toggleCos:   (piesa)       => dispatch({ type: ACTIONS.TOGGLE_COS,   payload: piesa }),
    setQty:      (id, qty)     => dispatch({ type: ACTIONS.SET_QTY,      payload: { id, qty } }),
    reset:       ()            => dispatch({ type: ACTIONS.RESET }),
  };
}

// ─── Hook selectori (evită re-renders inutile) ────────────────────────────────

export function useAppState() {
  const { state } = useAppContext();
  return state;
}

export function useCosTotal() {
  const { cos } = useAppState();
  return cos.reduce((s, i) => s + i.piesa.pret * i.qty, 0);
}
