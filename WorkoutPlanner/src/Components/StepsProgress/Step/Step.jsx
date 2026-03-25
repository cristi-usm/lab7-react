import React from "react";
import styles from '../StepsProgress.module.css'

const getCircleClass = (isActive, isDone) => {
  if (isActive) return styles.active;
  if (isDone) return styles.done;
  return "";
};

const getLabelClass = (isActive, isDone) => {
  if (isActive) return styles.labelActive;
  if (isDone) return styles.labelDone;
  return "";
};

const Step = ({ step, isActive, isDone, onClick, showLine }) => (
  <div
    key={step.id}
    className={`${styles.stepWrapper} ${isDone ? styles.clickable : ""}`}
    onClick={onClick}
  >
    <div className={styles.step}>
      <div className={`${styles.circle} ${getCircleClass(isActive, isDone)}`}>
        {step.id}
      </div>
      <span className={`${styles.label} ${getLabelClass(isActive, isDone)}`}>
        {step.label}
      </span>
    </div>
    {showLine && (
      <div className={`${styles.line} ${isDone ? styles.lineDone : ""}`} />
    )}
  </div>
);

export default Step;
