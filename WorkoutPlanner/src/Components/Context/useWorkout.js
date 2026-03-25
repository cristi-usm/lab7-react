import { useContext } from "react";
import { WorkoutStateContext, WorkoutDispatchContext } from "./WorkoutContext";

export function useWorkoutState() {
  return useContext(WorkoutStateContext);
}

export function useWorkoutDispatch() {
  return useContext(WorkoutDispatchContext);
}
