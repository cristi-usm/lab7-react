import React, { useState } from "react";
import styles from "../Preview.module.css";
import exercisesData from "../../../data/exercises.json";
import weekDays from "../../../data/weekDays.json";
import muscleGroups from "../../../data/muscleGroups.json";

const findLabel = (list, value) =>
  list.find((i) => i.value === value)?.label ?? value;

const ExercisesCard = ({ workouts, exercises }) => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className={styles.card}>
      <p className={styles.sectionTitle}>Exerciții</p>
      {workouts.map((wk) => {
        const exList = exercises[wk.id] || [];
        if (exList.length === 0) return null;
        const isOpen = openId === wk.id;

        return (
          <div key={wk.id} className={styles.accordionItem}>
            <div
              className={styles.accordionHeader}
              onClick={() => toggle(wk.id)}
            >
              <div>
                <p className={styles.accordionName}>{wk.name}</p>
                <span className={styles.accordionMeta}>
                  {findLabel(muscleGroups, wk.muscleGroup)} ·{" "}
                  {findLabel(weekDays, wk.day)}
                </span>
              </div>
              <span className={styles.accordionArrow}>
                {isOpen ? "▲" : "▼"}
              </span>
            </div>

            {isOpen && (
              <div className={styles.accordionBody}>
                {exList.map((ex) => (
                  <div key={ex.id} className={styles.exerciseRow}>
                    <p className={styles.exerciseName}>
                      {findLabel(
                        exercisesData[wk.muscleGroup] || [],
                        ex.exercise,
                      )}
                    </p>
                    <span className={styles.exerciseMeta}>
                      {ex.sets} seturi · {ex.reps} rep · {ex.weight} kg
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesCard;
