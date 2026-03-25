import React from "react";
import styles from "../Preview.module.css";
import weekDays from "../../../data/weekDays.json";
import muscleGroups from "../../../data/muscleGroups.json";

const findLabel = (list, value) => list.find((i) => i.value === value)?.label;

const WorkoutCard = ({ workouts }) => (
  <div className={styles.card}>
    <p className={styles.sectionTitle}>Antrenamente</p>
    {workouts.map((wk) => (
      <div key={wk.id} className={styles.workoutRow}>
        <div className={styles.workoutDot} />
        <p>
          {wk.name} · {findLabel(weekDays, wk.day)} ·{" "}
          {findLabel(muscleGroups, wk.muscleGroup)}
        </p>
      </div>
    ))}
  </div>
);

export default WorkoutCard;
