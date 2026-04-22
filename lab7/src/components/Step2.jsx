import { useFormState, useFormDispatch } from '../context/FormContext';
import FormField from './FormField';
import destinations from '../data/destinations.json';
import styles from './Step.module.css';

export default function Step2() {
    const { fields, errors, touched } = useFormState();
    const dispatch = useFormDispatch();

    const set = (field, value) => dispatch({ type: 'SET_FIELD', field, value });
    const touch = (field) => dispatch({ type: 'TOUCH_FIELD', field });

    const selectedDest = destinations.find(d => d.value === fields.destination);

    return (
        <div className={styles.step}>
            <h2 className={styles.title}>Mission Configuration</h2>
            <p className={styles.subtitle}>Define your mission parameters.</p>

            <FormField label="Mission Name" error={errors.missionName} touched={touched.missionName} hint="Min. 5 characters">
                <input
                    className={styles.input}
                    type="text"
                    value={fields.missionName}
                    onChange={e => set('missionName', e.target.value)}
                    onBlur={() => touch('missionName')}
                    placeholder="e.g. Operation Red Horizon"
                />
            </FormField>

            <FormField label="Destination" error={errors.destination} touched={touched.destination}>
                <select
                    className={styles.select}
                    value={fields.destination}
                    onChange={e => { set('destination', e.target.value); touch('destination'); }}
                    onBlur={() => touch('destination')}
                >
                    <option value="">— Select destination —</option>
                    {destinations.map(d => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                </select>
                {selectedDest && (
                    <div className={styles.destInfo}>
                        <span>📏 {selectedDest.distance}</span>
                        <span>⏱ {selectedDest.duration}</span>
                        <span>☠️ Danger: {selectedDest.danger}/10</span>
                    </div>
                )}
            </FormField>

            <div className={styles.grid2}>
                <FormField label="Launch Date" error={errors.launchDate} touched={touched.launchDate}>
                    <input
                        className={styles.input}
                        type="date"
                        value={fields.launchDate}
                        onChange={e => set('launchDate', e.target.value)}
                        onBlur={() => touch('launchDate')}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </FormField>

                <FormField label="Mission Duration (days)" error={errors.duration} touched={touched.duration}>
                    <input
                        className={styles.input}
                        type="number"
                        value={fields.duration}
                        onChange={e => set('duration', e.target.value)}
                        onBlur={() => touch('duration')}
                        placeholder="180"
                        min="1"
                    />
                </FormField>
            </div>

            <FormField label={`Mission Budget: $${fields.budget}B`} >
                <input
                    className={styles.range}
                    type="range"
                    value={fields.budget}
                    onChange={e => set('budget', Number(e.target.value))}
                    min="10"
                    max="500"
                    step="10"
                />
                <div className={styles.rangeLabels}>
                    <span>$10B</span>
                    <span>$500B</span>
                </div>
            </FormField>
        </div>
    );
}
