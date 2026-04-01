import { createContext, useContext, useReducer } from "react";

const StateContext = createContext(null);
const DispatchContext = createContext(null);

const initialState = {
  step: 0,
  submitted: false,
  values: {
    fullName: "",
    email: "",
    travelers: 1,
    birthDate: "",
    country: "",
    tripType: "",
    budget: 1500,
    startDate: "",
    endDate: "",
    extras: [],
    notes: "",
    agreeTerms: false,
  },
  touched: {},
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value,
        },
      };

    case "TOUCH_FIELD":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload]: true,
        },
      };

    case "VALIDATE_STEP": {
      const nextTouched = { ...state.touched };

      action.payload.forEach((field) => {
        nextTouched[field] = true;
      });

      return {
        ...state,
        touched: nextTouched,
      };
    }

    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };

    case "TOGGLE_EXTRA": {
      const exists = state.values.extras.includes(action.payload);

      return {
        ...state,
        values: {
          ...state.values,
          extras: exists
            ? state.values.extras.filter((item) => item !== action.payload)
            : [...state.values.extras, action.payload],
        },
      };
    }

    case "INCREMENT_TRAVELERS":
      return {
        ...state,
        values: {
          ...state.values,
          travelers: state.values.travelers + 1,
        },
      };

    case "DECREMENT_TRAVELERS":
      return {
        ...state,
        values: {
          ...state.values,
          travelers: Math.max(1, state.values.travelers - 1),
        },
      };

    case "SUBMIT_FORM":
      return {
        ...state,
        submitted: true,
      };

    case "RESET":
      return initialState;

    default:
      throw new Error("Unknown action type: " + action.type);
  }
}

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
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useFormState must be used inside FormProvider");
  }

  return context;
}

export function useFormDispatch() {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error("useFormDispatch must be used inside FormProvider");
  }

  return context;
}