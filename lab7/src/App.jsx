import "./App.css";
import { FormProvider, useFormState, useFormDispatch } from "./context/FormContext";
import ProgressBar from "./components/ProgressBar";
import LivePreview from "./components/LivePreview";
import Navigation from "./components/Navigation";
import SuccessMessage from "./components/SuccessMessage";
import StepPersonal from "./steps/StepPersonal";
import StepTrip from "./steps/StepTrip";
import StepExtras from "./steps/StepExtras";
import StepReview from "./steps/StepReview";
import { getStepFields } from "./utils/stepConfig";
import { validateForm } from "./utils/validation";

function FormContent() {
  const state = useFormState();
  const dispatch = useFormDispatch();

  const steps = [
    { id: 0, label: "Personal" },
    { id: 1, label: "Trip" },
    { id: 2, label: "Extras" },
    { id: 3, label: "Review" },
  ];

  const errors = validateForm(state.values);
  const currentStepFields = getStepFields(state.step);
  const canGoNext = currentStepFields.every((field) => !errors[field]);

  const handleNext = () => {
    dispatch({ type: "VALIDATE_STEP", payload: currentStepFields });

    if (state.step < 3 && canGoNext) {
      dispatch({ type: "SET_STEP", payload: state.step + 1 });
    }
  };

  const handleBack = () => {
    if (state.step > 0) {
      dispatch({ type: "SET_STEP", payload: state.step - 1 });
    }
  };

  const handleSubmit = () => {
    const allFields = Object.keys(state.values);
    dispatch({ type: "VALIDATE_STEP", payload: allFields });

    const finalErrors = validateForm(state.values);
    const hasErrors = Object.keys(finalErrors).length > 0;

    if (!hasErrors) {
      dispatch({ type: "SUBMIT_FORM" });
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return <StepPersonal errors={errors} />;
      case 1:
        return <StepTrip errors={errors} />;
      case 2:
        return <StepExtras errors={errors} />;
      case 3:
        return <StepReview />;
      default:
        return null;
    }
  };

  if (state.submitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="page">
      <div className="app-shell">
        <div className="form-panel">
          <div className="hero">
            <p className="eyebrow">Lab 7</p>
            <h1>Travel Planner Builder</h1>
          </div>

          <ProgressBar currentStep={state.step} steps={steps} />

          <div className="step-card">{renderStep()}</div>

          <Navigation
            step={state.step}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>

        <LivePreview />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormContent />
    </FormProvider>
  );
}