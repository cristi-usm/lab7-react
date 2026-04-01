import { FormProvider } from './context/FormContext';
import { useFormState, useFormDispatch } from './hooks/useForm';
import { validateStep } from './context/reducer';
import Stepper from './components/Stepper';
import Preview from './components/Preview';
import EchipaStep from './components/steps/EchipaStep';
import JucatoriStep from './components/steps/JucatoriStep';
import TurneuStep from './components/steps/TurneuStep';
import ReviewStep from './components/steps/ReviewStep';

const steps = [EchipaStep, JucatoriStep, TurneuStep, ReviewStep];

function FormContent() {
  const state = useFormState();
  const dispatch = useFormDispatch();
  const { step, submitted } = state;

  const StepComponent = steps[step];

  const handleNext = () => {
    dispatch({ type: 'VALIDATE_STEP', step });
    const errors = validateStep(state, step);
    if (Object.keys(errors).length === 0) {
      dispatch({ type: 'SET_STEP', step: step + 1 });
    }
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', step: step - 1 });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🎮</span>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">CS2 Team Register</h1>
            <p className="text-gray-600 text-xs">Înregistrare echipă turneu</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {!submitted && <Stepper />}

        <div className={`flex gap-8 ${submitted ? 'justify-center' : ''}`}>
          {/* Form */}
          <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <StepComponent />

            {/* Navigation */}
            {!submitted && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="px-5 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  ← Înapoi
                </button>

                {step < steps.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm transition-colors"
                  >
                    Continuă →
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Preview */}
          {!submitted && (
            <div className="w-64 shrink-0">
              <Preview />
            </div>
          )}
        </div>
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
