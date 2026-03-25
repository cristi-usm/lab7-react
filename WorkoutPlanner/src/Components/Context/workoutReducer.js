export const initialState = {
  currentStep: 1,

  personal: {
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    level: "",
    goals: [],
  },

  workouts: [
    // { id, name, day, muscleGroup }
  ],

  exercises: {
    // [workoutId]: [ { id, name, sets } ]
  },

  touched: {
    personal: {},
    workouts: {},
    exercises: {},
    trainings: false,
    ex: false,
  },
  // trainings si ex sunt pentru mesajul 'Adauga 1 antrenament sau 1 exercitiu', care sa nu apara din prima
  submitted: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "setCurrentStep": {
      const { id } = action.payload;
      return { ...state, currentStep: id };
    }

    case "setPersonalField": {
      const { field, value } = action.payload;
      return {
        ...state,
        personal: { ...state.personal, [field]: value },
      };
    }

    case "toggleGoal": {
      const { value } = action.payload;
      const current = state.personal.goals;
      const updated = current.includes(value)
        ? current.filter((g) => g !== value)
        : [...current, value];
      return {
        ...state,
        personal: { ...state.personal, goals: updated },
      };
    }

    case "addWorkout": {
      return { ...state, workouts: [...state.workouts, action.payload] };
    }

    case "updateWorkout": {
      const { id, field, value } = action.payload;
      return {
        ...state,
        workouts: state.workouts.map((wk) =>
          wk.id === id ? { ...wk, [field]: value } : wk,
        ),
      };
    }

    case "removeWorkout": {
      const { id } = action.payload;
      return {
        ...state,
        workouts: state.workouts.filter((wk) => wk.id !== id),
      };
    }

    case "addExercise": {
      const { workoutId, exercise } = action.payload;
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [workoutId]: [...(state.exercises[workoutId] || []), exercise],
        },
      };
    }

    case "updateExercise": {
      const { workoutId, exerciseId, ...fields } = action.payload;
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [workoutId]: state.exercises[workoutId].map((ex) =>
            ex.id === exerciseId ? { ...ex, ...fields } : ex,
          ),
        },
      };
    }

    case "removeExercise": {
      const { workoutId, id } = action.payload;
      return {
        ...state,
        exercises: {
          ...state.exercises,
          [workoutId]: state.exercises[workoutId].filter((ex) => ex.id !== id),
        },
      };
    }

    case "setTouchedPersonal": {
      const { field } = action.payload;
      return {
        ...state,
        touched: {
          ...state.touched,
          personal: {
            ...state.touched.personal,
            [field]: true,
          },
        },
      };
    }

    case "setAllTouchedPersonal": {
      return {
        ...state,
        touched: {
          ...state.touched,
          personal: {
            firstName: true,
            lastName: true,
            age: true,
            height: true,
            weight: true,
            gender: true,
            level: true,
            goals: true,
          },
        },
      };
    }

    case "setTouchedWorkout": {
      const { workoutId, field } = action.payload;
      return {
        ...state,
        touched: {
          ...state.touched,
          workouts: {
            ...state.touched.workouts,
            [workoutId]: {
              ...(state.touched.workouts[workoutId] || {}),
              [field]: true,
            },
          },
        },
      };
    }

    case "setAllTouchedWorkouts": {
      const allTouched = {};
      state.workouts.forEach((wk) => {
        allTouched[wk.id] = { name: true, day: true, muscleGroup: true };
      });
      return {
        ...state,
        touched: {
          ...state.touched,
          trainings: true,
          workouts: allTouched,
        },
      };
    }

    case "setAllTouchedExercises": {
      const allTouched = {};
      Object.entries(state.exercises).forEach(([workoutId, exList]) => {
        allTouched[workoutId] = {};
        exList.forEach((ex) => {
          allTouched[workoutId][ex.id] = { name: true, sets: true, kg: true };
        });
      });
      return {
        ...state,
        touched: {
          ...state.touched,
          ex: true,
          exercises: allTouched,
        },
      };
    }

    case "setTouchedTrainings": {
      return {
        ...state,
        touched: { ...state.touched, trainings: true },
      };
    }

    case "setTouchedEx": {
      return {
        ...state,
        touched: { ...state.touched, ex: true },
      };
    }

    case "startAgain": {
      return { ...initialState };
    }

    default:
      return state;
  }
};
