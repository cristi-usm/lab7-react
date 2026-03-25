import React from "react";
import { useWorkoutDispatch, useWorkoutState } from "../../Context/useWorkout";
import ExercisesInput from "./ExercisesInput/ExercisesInput";
import styles from "./StepThreeExercises.module.css";

const StepThreeExercises = () => {
  const dispatch = useWorkoutDispatch();
  const { workouts, exercises, touched } = useWorkoutState();

  const allHaveExercises = workouts.every(
    (wk) => (exercises[wk.id] || []).length > 0,
  );

  const handleContinue = () => {
    dispatch({ type: "setTouchedEx" });

    if (!allHaveExercises) return;

    dispatch({ type: "setCurrentStep", payload: { id: 4 } });
  };

  return (
    <div className={styles.container}>
      {workouts.map((wk) => (
        <ExercisesInput
          key={wk.id}
          workoutId={wk.id}
          muscleGroup={wk.muscleGroup}
          name={wk.name}
          day={wk.day}
        />
      ))}
      {touched.ex && !allHaveExercises && (
        <p className={styles.error}>
          Adaugă cel puțin un exercițiu la fiecare antrenament.
        </p>
      )}
      <button onClick={handleContinue} className={styles.button}>
        Continuă
      </button>
    </div>
  );
};

export default StepThreeExercises;
