import { useFormState, useFormDispatch } from '../context/FormContext';
import styles from './Stepper.module.css';

const STEPS = [
    { label: 'Astronaut', icon: '🧑‍🚀' },
    { label: 'Mission', icon: '🎯' },
    { label: 'Spacecraft', icon: '🚀' },
    { label: 'Review', icon: '📋' },
];

export default function Stepper() {
    const { currentStep } = useFormState();
    const dispatch = useFormDispatch();

    return (
        <div className={styles.stepper}>
            {STEPS.map((step, i) => {
                const status = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending';
                return (
                    <div key={i} className={styles.stepWrapper}>
                        <button
                            className={`${styles.step} ${styles[status]}`}
                            onClick={() => {
                                if (i < currentStep) dispatch({ type: 'SET_STEP', step: i });
                            }}
                            disabled={i > currentStep}
                            aria-label={step.label}
                        >
                            <span className={styles.icon}>
                                {status === 'done' ? '✓' : step.icon}
                            </span>
                            <span className={styles.label}>{step.label}</span>
                        </button>
                        {i < STEPS.length - 1 && (
                            <div className={`${styles.connector} ${i < currentStep ? styles.connectorDone : ''}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
