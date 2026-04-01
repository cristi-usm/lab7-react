

export const initialState = {
  pas:     1,
  marca:   null,
  model:   null,
  an:      "",
  motor:   "",
  cos:     [],
  filtCat: "Toate",
};


export const ACTIONS = {
  SET_PAS:       "SET_PAS",
  SET_MARCA:     "SET_MARCA",
  SET_MODEL:     "SET_MODEL",
  SET_AN:        "SET_AN",
  SET_MOTOR:     "SET_MOTOR",
  SET_FILT_CAT:  "SET_FILT_CAT",
  TOGGLE_COS:    "TOGGLE_COS",
  SET_QTY:       "SET_QTY",
  RESET:         "RESET",
};


export function appReducer(state, action) {
  switch (action.type) {

    case ACTIONS.SET_PAS:
      return { ...state, pas: action.payload };

    case ACTIONS.SET_MARCA:
      return { ...state, marca: action.payload, model: null, an: "", motor: "" };

    case ACTIONS.SET_MODEL:
      return { ...state, model: action.payload };

    case ACTIONS.SET_AN:
      return { ...state, an: action.payload };

    case ACTIONS.SET_MOTOR:
      return { ...state, motor: action.payload };

    case ACTIONS.SET_FILT_CAT:
      return { ...state, filtCat: action.payload };

    case ACTIONS.TOGGLE_COS: {
      const piesa   = action.payload;
      const exista  = state.cos.find(i => i.piesa.id === piesa.id);
      const cos     = exista
        ? state.cos.filter(i => i.piesa.id !== piesa.id)
        : [...state.cos, { piesa, qty: 1 }];
      return { ...state, cos };
    }

    case ACTIONS.SET_QTY: {
      const { id, qty } = action.payload;
      if (qty < 1) return { ...state, cos: state.cos.filter(i => i.piesa.id !== id) };
      return { ...state, cos: state.cos.map(i => i.piesa.id === id ? { ...i, qty } : i) };
    }

    case ACTIONS.RESET:
      return { ...initialState };

    default:
      return state;
  }
}
