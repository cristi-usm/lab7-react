import React from "react";
import { useWorkoutState } from "../Context/useWorkout";
import styles from "./Preview.module.css";
import PersonalCard from "./Cards/PersonalCard";
import WorkoutCard from "./Cards/WorkoutCard";
import ExercisesCard from "./Cards/ExercisesCard";

const Preview = () => {
  const { currentStep, personal, workouts, exercises } = useWorkoutState();

  const hasPersonalData = Object.values(personal).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== "",
  );
  if (!hasPersonalData) return null;

  return (
    <div className={styles.container}>
      <PersonalCard personal={personal} />
      {currentStep >= 2 && workouts.length > 0 && (
        <WorkoutCard workouts={workouts} />
      )}
      {currentStep >= 3 && workouts.length > 0 && (
        <ExercisesCard workouts={workouts} exercises={exercises} />
      )}
    </div>
  );
};

export default Preview;
