import React, { useState } from "react";
import { useWorkoutDispatch, useWorkoutState } from "../../Context/useWorkout";
import styles from "./StepFourReview.module.css";
import genders from "../../../data/genders.json";
import levels from "../../../data/levels.json";
import weekDays from "../../../data/weekDays.json";
import muscleGroups from "../../../data/muscleGroups.json";
import exercisesData from "../../../data/exercises.json";

const findLabel = (list, value) =>
  list.find((i) => i.value === value)?.label ?? value;

const StepFourReview = () => {
  const { personal, workouts, exercises } = useWorkoutState();
  const dispatch = useWorkoutDispatch();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className={styles.success}>
        <h2 className={styles.successTitle}>Planul tău a fost creat!</h2>
        <p className={styles.successText}>
          Ești gata să începi, <strong>{personal.firstName}</strong>. Ai{" "}
          {workouts.length} antrenamente configurate și ești la nivel de{" "}
          <strong>{findLabel(levels, personal.level)}</strong>. Mult succes!
        </p>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: "startAgain" })}
        >
          Începe din nou
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Revizuire</h2>

      <div className={styles.card}>
        <p className={styles.sectionTitle}>Informații personale</p>
        <div className={styles.grid}>
          <div className={styles.field}>
            <span>Prenume</span>
            <p>{personal.firstName}</p>
          </div>
          <div className={styles.field}>
            <span>Nume</span>
            <p>{personal.lastName}</p>
          </div>
          <div className={styles.field}>
            <span>Vârstă</span>
            <p>{personal.age}</p>
          </div>
          <div className={styles.field}>
            <span>Greutate</span>
            <p>{personal.weight} kg</p>
          </div>
          <div className={styles.field}>
            <span>Înălțime</span>
            <p>{personal.height} cm</p>
          </div>
          <div className={styles.field}>
            <span>Gen</span>
            <p>{findLabel(genders, personal.gender)}</p>
          </div>
          <div className={styles.field}>
            <span>Nivel</span>
            <p>{findLabel(levels, personal.level)}</p>
          </div>
        </div>
      </div>

      <p className={styles.sectionTitle}>Antrenamente</p>
      {workouts.map((wk) => (
        <div key={wk.id} className={styles.card}>
          <p className={styles.sectionTitle}>{wk.name}</p>
          <p className={styles.meta}>
            {findLabel(muscleGroups, wk.muscleGroup)} ·{" "}
            {findLabel(weekDays, wk.day)}
          </p>
          {(exercises[wk.id] || []).map((ex) => (
            <div key={ex.id} className={styles.exerciseRow}>
              <p>
                {findLabel(exercisesData[wk.muscleGroup] || [], ex.exercise)}
              </p>
              <span>
                {ex.sets} seturi · {ex.reps} rep · {ex.weight} kg
              </span>
            </div>
          ))}
        </div>
      ))}

      <button className={styles.button} onClick={() => setSubmitted(true)}>
        Finalizează
      </button>
    </div>
  );
};

export default StepFourReview;
