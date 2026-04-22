import styles from './FormField.module.css';

export default function FormField({ label, error, touched, children, hint }) {
    const showError = touched && error;
    return (
        <div className={`${styles.field} ${showError ? styles.hasError : ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            {hint && <span className={styles.hint}>{hint}</span>}
            {children}
            {showError && <span className={styles.error}>⚠ {error}</span>}
        </div>
    );
}
