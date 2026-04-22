import { useFormState, useFormDispatch } from '../context/FormContext';
import FormField from './FormField';
import spacecraft from '../data/spacecraft.json';
import equipment from '../data/equipment.json';
import priorities from '../data/priorities.json';
import styles from './Step.module.css';

export default function Step3() {
    const { fields, errors, touched } = useFormState();
    const dispatch = useFormDispatch();

    const touch = (field) => dispatch({ type: 'TOUCH_FIELD', field });

    return (
        <div className={styles.step}>
            <h2 className={styles.title}>Spacecraft & Loadout</h2>
            <p className={styles.subtitle}>Choose your vessel and mission gear.</p>

            <FormField label="Spacecraft" error={errors.spacecraft} touched={touched.spacecraft}>
                <div className={styles.craftGrid}>
                    {spacecraft.map(ship => (
                        <label
                            key={ship.value}
                            className={`${styles.craftCard} ${fields.spacecraft === ship.value ? styles.craftCardActive : ''}`}
                            onClick={() => { dispatch({ type: 'SET_FIELD', field: 'spacecraft', value: ship.value }); touch('spacecraft'); }}
                        >
                            <input type="radio" name="spacecraft" value={ship.value} checked={fields.spacecraft === ship.value} onChange={() => { }} style={{ display: 'none' }} />
                            <div className={styles.craftIcon}>{ship.icon}</div>
                            <div>
                                <strong>{ship.label}</strong>
                                <div className={styles.craftType}>{ship.type}</div>
                                <div className={styles.craftDesc}>{ship.description}</div>
                                <div className={styles.craftStats}>
                                    <span>👥 {ship.crew}</span>
                                    <span>⚡ {ship.speed}</span>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </FormField>

            <FormField label="Equipment (min. 2)" error={errors.equipment} touched={touched.equipment}>
                <div className={styles.checkGrid}>
                    {equipment.map(item => (
                        <label
                            key={item.value}
                            className={`${styles.checkCard} ${fields.equipment.includes(item.value) ? styles.checkCardActive : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={fields.equipment.includes(item.value)}
                                onChange={() => { dispatch({ type: 'TOGGLE_EQUIPMENT', value: item.value }); touch('equipment'); }}
                                style={{ display: 'none' }}
                            />
                            <span>{item.label}</span>
                            <span className={styles.weight}>{item.weight}kg</span>
                        </label>
                    ))}
                </div>
            </FormField>

            <FormField label="Mission Priorities (min. 1)" error={errors.priorities} touched={touched.priorities}>
                <div className={styles.checkGrid}>
                    {priorities.map(p => (
                        <label
                            key={p.value}
                            className={`${styles.checkCard} ${fields.priorities.includes(p.value) ? styles.checkCardActive : ''}`}
                        >
                            <input
                                type="checkbox"
                                checked={fields.priorities.includes(p.value)}
                                onChange={() => { dispatch({ type: 'TOGGLE_PRIORITY', value: p.value }); touch('priorities'); }}
                                style={{ display: 'none' }}
                            />
                            <span>{p.label}</span>
                        </label>
                    ))}
                </div>
            </FormField>
        </div>
    );
}
