import { useFormState, useFormDispatch } from "./context/hooks";
import { validateStep, STEP_FIELDS } from "./utils/validators";
import Stepper from "./components/Stepper";
import LivePreview from "./components/LivePreview";
import Step1Personal from "./components/steps/Step1Personal";
import Step2Table from "./components/steps/Step2Table";
import Step3Extras from "./components/steps/Step3Extras";
import Step4Review from "./components/steps/Step4Review";
import SuccessScreen from "./components/SuccessScreen";
import "./App.css";

const STEPS = ["Personal", "Masa", "Extra", "Review"];

export default function App() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { currentStep, fields, submitted } = state;

  if (submitted) return <SuccessScreen />;

  function handleNext() {
    dispatch({ type: "VALIDATE_STEP", fields: STEP_FIELDS[currentStep] });

    const errors = validateStep(fields, currentStep);
    if (Object.keys(errors).length > 0) return;

    dispatch({ type: "SET_STEP", step: currentStep + 1 });
  }

  function handleBack() {
    dispatch({ type: "SET_STEP", step: currentStep - 1 });
  }

  function handleSubmit() {
    dispatch({ type: "SET_SUBMITTED" });
  }

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="app-layout">
      <div className="form-panel">
        <h1 className="app-title"> Rezervare Masa Club</h1>

        <Stepper steps={STEPS} currentStep={currentStep} />

        <div className="step-content">
          {currentStep === 0 && <Step1Personal />}
          {currentStep === 1 && <Step2Table />}
          {currentStep === 2 && <Step3Extras />}
          {currentStep === 3 && <Step4Review />}
        </div>

        <div className="nav-buttons">
          {currentStep > 0 && (
            <button className="btn btn-back" onClick={handleBack}>
              Inapoi
            </button>
          )}

          {!isLastStep ? (
            <button className="btn btn-next" onClick={handleNext}>
              Inainte
            </button>
          ) : (
            <button className="btn btn-submit" onClick={handleSubmit}>
              Confirma Rezervarea
            </button>
          )}
        </div>
      </div>

      <div className="preview-panel">
        <LivePreview />
      </div>
    </div>
  );
}
