import "./App.css";
import React from "react";
import StepOnePersonal from "./Components/Steps/StepOne/StepOnePersonal";
import WorkoutProvider from "./Components/Providers/WorkoutProvider";
import { useWorkoutState } from "./Components/Context/useWorkout";
import StepTwoWorkouts from "./Components/Steps/StepTwo/StepTwoWorkouts";
import StepThreeExercises from "./Components/Steps/StepThree/StepThreeExercises";
import StepFourReview from "./Components/Steps/StepFour/StepFourReview";
import Preview from "./Components/Preview/Preview";
import StepsProgress from "./Components/StepsProgress/StepsProgress";

const WorkoutSteps = () => {
  const { currentStep } = useWorkoutState();

  return (
    <>
      {currentStep === 1 && <StepOnePersonal />}
      {currentStep === 2 && <StepTwoWorkouts />}
      {currentStep === 3 && <StepThreeExercises />}
      {currentStep === 4 && <StepFourReview />}
    </>
  );
};

const App = () => {
  return (
    <WorkoutProvider>
      <div className="app">
        <header className="header">
          <StepsProgress />
        </header>
        <div className="layout">
          <main className="main">
            <WorkoutSteps />
          </main>
          <div className="sidebar">
            <Preview />
          </div>
        </div>
      </div>
    </WorkoutProvider>
  );
};

export default App;
