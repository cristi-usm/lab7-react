import React from "react";
import { useWorkoutDispatch, useWorkoutState } from "../../Context/useWorkout";
import styles from "./StepTwoWorkouts.module.css";
import WorkoutInput from "./WorkoutInput/WorkoutInput";

const StepTwoWorkouts = () => {
  const { workouts, touched } = useWorkoutState();
  const dispatch = useWorkoutDispatch();

  const handleAdd = () => {
    const nextId =
      workouts.length > 0 ? Math.max(...workouts.map((wk) => wk.id)) + 1 : 1;

    dispatch({
      type: "addWorkout",
      payload: { id: nextId, name: "", day: "", muscleGroup: "" },
    });
  };

  const handleContinue = () => {
    dispatch({ type: "setAllTouchedWorkouts" });

    if (workouts.length === 0) return;

    const hasInvalid = workouts.some(
      (wk) => !wk.name || !wk.day || !wk.muscleGroup,
    );

    if (!hasInvalid) {
      dispatch({ type: "setCurrentStep", payload: { id: 3 } });
    }
  };

  const noWorkoutsError = workouts.length === 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Antrenamente</h2>

      {workouts.map((wk) => (
        <WorkoutInput key={wk.id} workout={wk} />
      ))}

      <button onClick={handleAdd} className={styles.addButton}>
        + Adaugă antrenament
      </button>

      {touched.trainings && noWorkoutsError && (
        <p className={styles.error}>Adaugă cel puțin un antrenament.</p>
      )}

      <button onClick={handleContinue} className={styles.button}>
        Continuă
      </button>
    </div>
  );
};

export default StepTwoWorkouts;
