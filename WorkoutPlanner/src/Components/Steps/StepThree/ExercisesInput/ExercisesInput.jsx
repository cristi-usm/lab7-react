import React, { useState } from "react";
import exercisesData from "../../../../data/exercises.json";
import weekDays from "../../../../data/weekDays.json";
import muscleGroups from "../../../../data/muscleGroups.json";
import { useWorkoutDispatch, useWorkoutState } from "../../../Context/useWorkout";
import styles from "../StepThreeExercises.module.css";

const emptyForm = { exercise: "", sets: "", reps: "", weight: "" };
const emptyTouched = { exercise: false, sets: false, reps: false, weight: false };

const findLabel = (list, value) => list.find((i) => i.value === value)?.label ?? value;

const ExercisesInput = ({ workoutId, name, day, muscleGroup }) => {
  const { exercises } = useWorkoutState();
  const dispatch = useWorkoutDispatch();
  const [form, setForm] = useState(emptyForm);
  const [touchedForm, setTouchedForm] = useState(emptyTouched);
  const [isEditing, setIsEditing] = useState(false);

  const exerciseList = exercisesData[muscleGroup] || [];
  const addedExercises = exercises[workoutId] || [];

  const getErrors = () => {
    const errors = {};
    if (!form.exercise) errors.exercise = "Selectează un exercițiu";
    if (!form.sets) errors.sets = "Seturi obligatorii";
    if (!form.reps) errors.reps = "Reps obligatorii";
    if (!form.weight) errors.weight = "Kg obligatorii";
    return errors;
  };

  const renderError = (field) => {
    const errors = getErrors();
    return touchedForm[field] && errors[field]
      ? <p className={styles.error}>{errors[field]}</p>
      : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value !== "" && Number(value) < 1) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouchedForm((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const handleAdd = () => {
    setTouchedForm({ exercise: true, sets: true, reps: true, weight: true });

    const errors = getErrors();
    if (Object.keys(errors).length > 0) return;

    if (isEditing) {
      dispatch({ type: "updateExercise", payload: { workoutId, exerciseId: isEditing, ...form } });
      setIsEditing(false);
    } else {
      dispatch({ type: "addExercise", payload: { workoutId, exercise: { ...form, id: Date.now() } } });
    }

    setForm(emptyForm);
    setTouchedForm(emptyTouched);
  };

  const handleEdit = (ex) => {
    setIsEditing(ex.id);
    setForm({ exercise: ex.exercise, sets: ex.sets, reps: ex.reps, weight: ex.weight });
    setTouchedForm(emptyTouched);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4 className={styles.name}>{name}</h4>
        <span className={styles.meta}>
          {findLabel(muscleGroups, muscleGroup)} · {findLabel(weekDays, day)}
        </span>
      </div>


      <select name="exercise" value={form.exercise} onChange={handleChange} onBlur={handleBlur} className={styles.select}>
        <option value="">Selectează exercițiu</option>
        {exerciseList.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {renderError("exercise")}

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input type="number" min="1" name="sets" value={form.sets} placeholder="Seturi" onChange={handleChange} onBlur={handleBlur} className={styles.input} />
          {renderError("sets")}
        </div>
        <div className={styles.inputGroup}>
          <input type="number" min="1" name="reps" value={form.reps} placeholder="Reps" onChange={handleChange} onBlur={handleBlur} className={styles.input} />
          {renderError("reps")}
        </div>
        <div className={styles.inputGroup}>
          <input type="number" min="1" name="weight" value={form.weight} placeholder="Kg" onChange={handleChange} onBlur={handleBlur} className={styles.input} />
          {renderError("weight")}
        </div>
      </div>


      <button onClick={handleAdd} className={styles.addButton}>
        {isEditing ? "Salvează" : "+ Adaugă exercițiu"}
      </button>

      {addedExercises.map((ex) => (
        <div key={ex.id} className={styles.exerciseRow}>
          <div>
            <p className={styles.exerciseName}>{findLabel(exerciseList, ex.exercise)}</p>
            <span className={styles.exerciseMeta}>{ex.sets} seturi · {ex.reps} rep · {ex.weight} kg</span>
          </div>
          <div className={styles.actions}>
            {isEditing !== ex.id && (
              <button onClick={() => handleEdit(ex)} className={styles.editButton}>Editează</button>
            )}
            <button onClick={() => dispatch({ type: "removeExercise", payload: { workoutId, id: ex.id } })} className={styles.removeButton}>
              Șterge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExercisesInput;