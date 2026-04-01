export const initialState = {
  step: 0,
  values: {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    stats: [],
    plans: [],
    slots: []
  },
  touched: {},
  submitted: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        }
      }

    case 'ADD_STAT':
      return {
        ...state,
        values: {
          ...state.values,
          stats: [...state.values.stats, { label: '', value: '' }]
        }
      }

    case 'REMOVE_STAT':
      return {
        ...state,
        values: {
          ...state.values,
          stats: state.values.stats.filter((_, i) => i !== action.index)
        }
      }

    case 'ADD_PLAN':
      return {
        ...state,
        values: {
          ...state.values,
          plans: [...state.values.plans, { label: '', amount: 0, benefits: [], type: '' }]
        }
      }

    case 'SET_STEP':
      return {
        ...state,
        step: action.step
      }

    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true
        }
      }

    case 'SUBMIT':
      return {
        ...state,
        submitted: true
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
