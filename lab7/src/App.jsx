import { FormProvider, useFormState, useFormDispatch } from './context/FormContext';
import Stepper from './components/Stepper';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import LivePreview from './components/LivePreview';
import SuccessScreen from './components/SuccessScreen';
import styles from './App.module.css';

const STEPS = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];

function FormLayout() {
  const { currentStep, submitted } = useFormState();
  const dispatch = useFormDispatch();

  if (submitted) return <SuccessScreen />;

  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🛸</span>
          <span className={styles.logoText}>COSMO<span className={styles.logoAccent}>FORM</span></span>
        </div>
        <div className={styles.tagline}>Deep Space Mission Registration System</div>
      </header>

      <Stepper />

      <main className={styles.main}>
        <div className={styles.formPanel}>
          {STEPS[currentStep]}

          <div className={styles.navButtons}>
            {currentStep > 0 && (
              <button
                className={styles.btnBack}
                onClick={() => dispatch({ type: 'SET_STEP', step: currentStep - 1 })}
              >
                ← Back
              </button>
            )}
            <div style={{ flex: 1 }} />
            {!isLast ? (
              <button
                className={styles.btnNext}
                onClick={() => dispatch({ type: 'SET_STEP', step: currentStep + 1 })}
              >
                Next →
              </button>
            ) : null}
          </div>
        </div>

        <LivePreview />
      </main>

      <footer className={styles.footer}>
        <span className={styles.footerText}>COSMOFORM v2.4 — Galactic Operations Division</span>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormLayout />
    </FormProvider>
  );
}
