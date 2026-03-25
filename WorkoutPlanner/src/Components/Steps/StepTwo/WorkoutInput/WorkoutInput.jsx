import React from "react";
import {
  useWorkoutDispatch,
  useWorkoutState,
} from "../../../Context/useWorkout";
import styles from "../StepTwoWorkouts.module.css";
import muscleGroups from "../../../../data/muscleGroups.json";
import weekDays from "../../../../data/weekDays.json";

const WorkoutInput = ({ workout }) => {
  const dispatch = useWorkoutDispatch();
  const { touched } = useWorkoutState();

  const touchedWorkout = touched.workouts[workout.id] || {};

  const getErrors = () => {
    const errors = {};

    if (!workout.name) errors.name = "Numele este obligatoriu";
    else if (workout.name.length < 2) errors.name = "Numele trebuie să aibă minim 2 caractere";
    else if (workout.name.length > 50) errors.name = "Numele poate avea maxim 50 caractere";

    if (!workout.day) errors.day = "Ziua este obligatorie";
    if (!workout.muscleGroup) errors.muscleGroup = "Grupa musculară este obligatorie";

    return errors;
  };

  const renderError = (field) => {
    const errors = getErrors();
    return touchedWorkout[field] && errors[field] ? (
      <p className={styles.error}>{errors[field]}</p>
    ) : null;
  };

  const handleChange = (e) =>
    dispatch({
      type: "updateWorkout",
      payload: { id: workout.id, field: e.target.name, value: e.target.value },
    });

  const handleBlur = (e) =>
    dispatch({
      type: "setTouchedWorkout",
      payload: { workoutId: workout.id, field: e.target.name },
    });

  const handleRemove = () =>
    dispatch({ type: "removeWorkout", payload: { id: workout.id } });

  return (
    <div className={styles.card}>
      <input
        type="text"
        name="name"
        placeholder="Nume antrenament"
        value={workout.name}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      />
      {renderError("name")}

      <select
        name="day"
        value={workout.day}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      >
        <option value="">Selectează ziua</option>
        {weekDays.map((d) => (
          <option key={d.value} value={d.value}>
            {d.label}
          </option>
        ))}
      </select>
      {renderError("day")}

      <select
        name="muscleGroup"
        value={workout.muscleGroup}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      >
        <option value="">Selectează grupa musculară</option>
        {muscleGroups.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      {renderError("muscleGroup")}

      <button onClick={handleRemove} className={styles.removeButton}>
        Șterge
      </button>
    </div>
  );
};

export default WorkoutInput;
