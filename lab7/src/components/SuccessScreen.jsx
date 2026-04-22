import { useFormState, useFormDispatch } from '../context/FormContext';
import styles from './SuccessScreen.module.css';

export default function SuccessScreen() {
    const { fields } = useFormState();
    const dispatch = useFormDispatch();

    return (
        <div className={styles.screen}>
            <div className={styles.stars}>
                {[...Array(40)].map((_, i) => (
                    <span
                        key={i}
                        className={styles.star}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            fontSize: `${Math.random() * 12 + 4}px`,
                        }}
                    >★</span>
                ))}
            </div>

            <div className={styles.content}>
                <div className={styles.rocket}>🚀</div>
                <h1 className={styles.title}>Mission Approved</h1>
                <p className={styles.sub}>
                    {fields.firstName ? `${fields.firstName} ${fields.lastName}` : 'Astronaut'}, your mission{' '}
                    <strong className={styles.highlight}>
                        {fields.missionName || 'UNNAMED'}
                    </strong>{' '}
                    has been cleared for launch.
                </p>
                <div className={styles.code}>
                    MISSION ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </div>
                <p className={styles.msg}>
                    All systems nominal. Your crew will be briefed at T-72 hours.
                    Godspeed, {fields.role?.toUpperCase() || 'COMMANDER'}.
                </p>
                <button className={styles.resetBtn} onClick={() => dispatch({ type: 'RESET' })}>
                    ↩ Start New Mission
                </button>
            </div>
        </div>
    );
}
