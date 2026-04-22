import { useFormState, useFormDispatch } from '../context/FormContext';
import FormField from './FormField';
import roles from '../data/roles.json';
import styles from './Step.module.css';

export default function Step1() {
    const { fields, errors, touched } = useFormState();
    const dispatch = useFormDispatch();

    const set = (field, value) => dispatch({ type: 'SET_FIELD', field, value });
    const touch = (field) => dispatch({ type: 'TOUCH_FIELD', field });

    return (
        <div className={styles.step}>
            <h2 className={styles.title}>Astronaut Profile</h2>
            <p className={styles.subtitle}>Tell us who's going to space.</p>

            <div className={styles.grid2}>
                <FormField label="First Name" error={errors.firstName} touched={touched.firstName}>
                    <input
                        className={styles.input}
                        type="text"
                        value={fields.firstName}
                        onChange={e => set('firstName', e.target.value)}
                        onBlur={() => touch('firstName')}
                        placeholder="e.g. Neil"
                    />
                </FormField>

                <FormField label="Last Name" error={errors.lastName} touched={touched.lastName}>
                    <input
                        className={styles.input}
                        type="text"
                        value={fields.lastName}
                        onChange={e => set('lastName', e.target.value)}
                        onBlur={() => touch('lastName')}
                        placeholder="e.g. Armstrong"
                    />
                </FormField>
            </div>

            <FormField label="Email" error={errors.email} touched={touched.email}>
                <input
                    className={styles.input}
                    type="email"
                    value={fields.email}
                    onChange={e => set('email', e.target.value)}
                    onBlur={() => touch('email')}
                    placeholder="astronaut@space.agency"
                />
            </FormField>

            <FormField label="Age" error={errors.age} touched={touched.age} hint="Must be 18–65">
                <input
                    className={styles.input}
                    type="number"
                    value={fields.age}
                    onChange={e => set('age', e.target.value)}
                    onBlur={() => touch('age')}
                    placeholder="30"
                    min="18"
                    max="65"
                />
            </FormField>

            <FormField label="Mission Role" error={errors.role} touched={touched.role}>
                <div className={styles.radioGrid}>
                    {roles.map(r => (
                        <label
                            key={r.value}
                            className={`${styles.radioCard} ${fields.role === r.value ? styles.radioCardActive : ''}`}
                        >
                            <input
                                type="radio"
                                name="role"
                                value={r.value}
                                checked={fields.role === r.value}
                                onChange={() => { set('role', r.value); touch('role'); }}
                                style={{ display: 'none' }}
                            />
                            <strong>{r.label}</strong>
                            <span className={styles.roleDesc}>{r.description}</span>
                        </label>
                    ))}
                </div>
            </FormField>

            <FormField label="Astronaut Bio" error={errors.bio} touched={touched.bio} hint="Min. 20 characters">
                <textarea
                    className={styles.textarea}
                    value={fields.bio}
                    onChange={e => set('bio', e.target.value)}
                    onBlur={() => touch('bio')}
                    placeholder="Describe your space experience, skills, and motivation for this mission..."
                    rows={4}
                />
            </FormField>
        </div>
    );
}
