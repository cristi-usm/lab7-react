import React, { useReducer } from "react";
import {
  WorkoutStateContext,
  WorkoutDispatchContext,
} from "../Context/WorkoutContext";
import { initialState, reducer } from "../Context/workoutReducer";

const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WorkoutStateContext.Provider value={state}>
      <WorkoutDispatchContext.Provider value={dispatch}>
        {children}
      </WorkoutDispatchContext.Provider>
    </WorkoutStateContext.Provider>
  );
};

export default WorkoutProvider;
