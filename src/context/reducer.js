export const initialState = {
  currentStep: 0,
  submitted: false,

  fields: {
    name: "",
    email: "",
    phone: "",
    age: "",

    tableType: "",
    guests: "",
    date: "",
    time: "",

    extras: [],
    specialRequests: "",
    budget: 500,
  },

  touched: {},
  errors: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value,
        },
      };

    case "TOUCH_FIELD":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case "VALIDATE_STEP": {
      const newTouched = { ...state.touched };
      action.fields.forEach((f) => {
        newTouched[f] = true;
      });
      return {
        ...state,
        touched: newTouched,
      };
    }

    case "SET_STEP":
      return {
        ...state,
        currentStep: action.step,
      };

    case "TOGGLE_EXTRA": {
      const exists = state.fields.extras.includes(action.value);
      return {
        ...state,
        fields: {
          ...state.fields,
          extras: exists
            ? state.fields.extras.filter((e) => e !== action.value)
            : [...state.fields.extras, action.value],
        },
      };
    }

    case "SET_SUBMITTED":
      return {
        ...state,
        submitted: true,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
