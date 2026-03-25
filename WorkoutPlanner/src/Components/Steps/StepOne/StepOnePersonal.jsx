import React from "react";
import { useWorkoutDispatch, useWorkoutState } from "../../Context/useWorkout";
import styles from "./StepOnePersonal.module.css";
import genders from "../../../data/genders.json";
import levels from "../../../data/levels.json";
import goals from "../../../data/goals.json";

const StepOnePersonal = () => {
  const { personal, touched } = useWorkoutState();
  const dispatch = useWorkoutDispatch();

  const handleChange = (e) => {
    dispatch({
      type: "setPersonalField",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleBlur = (e) => {
    dispatch({
      type: "setTouchedPersonal",
      payload: { field: e.target.name },
    });
  };

  const handleToggleGoal = (value) => {
    dispatch({ type: "toggleGoal", payload: { value } });
  };

  const getErrors = () => {
    const { firstName, lastName, age, weight, height, gender, level, goals: selectedGoals } = personal;
    const errors = {};

    if (!firstName) errors.firstName = "Prenumele este obligatoriu";
    if (!lastName) errors.lastName = "Numele este obligatoriu";
    if (!age) errors.age = "Vârsta este obligatorie";
    else if (age < 12 || age > 100) errors.age = "Vârsta trebuie să fie între 12 și 100 ani";
    if (!weight) errors.weight = "Greutatea este obligatorie";
    else if (weight < 20 || weight > 300) errors.weight = "Greutatea trebuie să fie între 20 și 300 kg";
    if (!height) errors.height = "Înălțimea este obligatorie";
    else if (height < 100 || height > 250) errors.height = "Înălțimea trebuie să fie între 100 și 250 cm";
    if (!gender) errors.gender = "Alege un gen";
    if (!level) errors.level = "Alege un nivel";
    if (selectedGoals.length === 0) errors.goals = "Alege cel puțin un obiectiv";

    return errors;
  };

  const renderError = (field) => {
    const errors = getErrors();
    return touched.personal[field] && errors[field] ? (
      <p className={styles.error}>{errors[field]}</p>
    ) : null;
  };

  const handleContinue = () => {
    dispatch({ type: "setAllTouchedPersonal" });

    const errors = getErrors();
    if (Object.keys(errors).length === 0) {
      dispatch({ type: "setCurrentStep", payload: { id: 2 } });
    }
  };

  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Informații personale</h2>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Prenume</label>
        <input
          name="firstName"
          value={personal.firstName}
          onChange={handleChange}
          className={styles.input}
          onBlur={handleBlur}
        />
        {renderError("firstName")}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Nume</label>
        <input
          name="lastName"
          value={personal.lastName}
          onChange={handleChange}
          className={styles.input}
          onBlur={handleBlur}
        />
        {renderError("lastName")}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Vârstă</label>
        <input
          min="12"
          max="100"
          type="number"
          name="age"
          value={personal.age}
          onChange={handleChange}
          onBlur={handleBlur}
          className={styles.input}
        />
        {renderError("age")}
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <input
            min="20"
            max="300"
            type="number"
            name="weight"
            value={personal.weight}
            placeholder="Greutate"
            onChange={handleChange}
            className={styles.input}
            onBlur={handleBlur}
          />
          {renderError("weight")}
        </div>
        <div className={styles.inputGroup}>
          <input
            min="100"
            max="250"
            type="number"
            name="height"
            value={personal.height}
            placeholder="Înălțime"
            onChange={handleChange}
            className={styles.input}
            onBlur={handleBlur}
          />
          {renderError("height")}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Gen</label>
        <div className={styles.radioGroup}>
          {genders.map((g) => (
            <label key={g.value} className={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value={g.value}
                checked={personal.gender === g.value}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {g.label}
            </label>
          ))}
        </div>
        {renderError("gender")}
      </div>

      <div className={styles.inputGroup}>
        <select
          name="level"
          value={personal.level}
          onChange={handleChange}
          className={styles.input}
          onBlur={handleBlur}
        >
          <option value="">Nivel</option>
          {levels.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
        {renderError("level")}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Obiective</label>
        <div className={styles.checkboxGroup}>
          {goals.map((g) => (
            <label key={g.value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={g.value}
                checked={personal.goals.includes(g.value)}
                onChange={() => handleToggleGoal(g.value)}
              />
              {g.label}
            </label>
          ))}
        </div>
        {renderError("goals")}
      </div>

      <div className={styles.buttonWrapper}>
        <button
          type="button"
          onClick={handleContinue}
          className={styles.button}
        >
          Continuă
        </button>
      </div>
    </form>
  );
};

export default StepOnePersonal;