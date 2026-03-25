import React from "react";
import { useWorkoutDispatch, useWorkoutState } from "../Context/useWorkout";
import styles from "./StepsProgress.module.css";
import steps from "../../data/steps.json";
import Step from "./Step/Step.jsx";

const StepsProgress = () => {
  const { currentStep } = useWorkoutState();
  const dispatch = useWorkoutDispatch();

  const handleClick = (stepId) => {
    if (stepId < currentStep) {
      dispatch({ type: "setCurrentStep", payload: { id: stepId } });
    }
  };

  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <Step
          key={step.id}
          step={step}
          isActive={currentStep === step.id}
          isDone={currentStep > step.id}
          onClick={() => handleClick(step.id)}
          showLine={index < steps.length - 1}
        />
      ))}
    </div>
  );
};

export default StepsProgress;
