import { useFormState, useFormDispatch } from '../context/FormContext';
import destinations from '../data/destinations.json';
import spacecraft from '../data/spacecraft.json';
import equipment from '../data/equipment.json';
import priorities from '../data/priorities.json';
import roles from '../data/roles.json';
import styles from './Step.module.css';

export default function Step4() {
    const { fields } = useFormState();
    const dispatch = useFormDispatch();

    const dest = destinations.find(d => d.value === fields.destination);
    const ship = spacecraft.find(s => s.value === fields.spacecraft);
    const equip = equipment.filter(e => fields.equipment.includes(e.value));
    const prios = priorities.filter(p => fields.priorities.includes(p.value));
    const role = roles.find(r => r.value === fields.role);

    return (
        <div className={styles.step}>
            <h2 className={styles.title}>Mission Briefing</h2>
            <p className={styles.subtitle}>Review all data before submission. No changes after launch.</p>

            <div className={styles.reviewGrid}>
                <div className={styles.reviewSection}>
                    <div className={styles.reviewHeader}>🧑‍🚀 Astronaut Profile</div>
                    <div className={styles.reviewRow}><span>Name</span><span>{fields.firstName} {fields.lastName}</span></div>
                    <div className={styles.reviewRow}><span>Email</span><span>{fields.email}</span></div>
                    <div className={styles.reviewRow}><span>Age</span><span>{fields.age} years</span></div>
                    <div className={styles.reviewRow}><span>Role</span><span>{role?.label}</span></div>
                    <div className={styles.reviewRow}><span>Bio</span><span className={styles.bioText}>{fields.bio}</span></div>
                </div>

                <div className={styles.reviewSection}>
                    <div className={styles.reviewHeader}>🎯 Mission Parameters</div>
                    <div className={styles.reviewRow}><span>Name</span><span>{fields.missionName}</span></div>
                    <div className={styles.reviewRow}><span>Destination</span><span>{dest?.label}</span></div>
                    <div className={styles.reviewRow}><span>Launch</span><span>{fields.launchDate}</span></div>
                    <div className={styles.reviewRow}><span>Duration</span><span>{fields.duration} days</span></div>
                    <div className={styles.reviewRow}><span>Budget</span><span>${fields.budget}B</span></div>
                </div>

                <div className={styles.reviewSection}>
                    <div className={styles.reviewHeader}>🚀 Spacecraft & Gear</div>
                    <div className={styles.reviewRow}><span>Vessel</span><span>{ship?.icon} {ship?.label}</span></div>
                    <div className={styles.reviewRow}>
                        <span>Equipment</span>
                        <span>{equip.map(e => e.label).join(', ')}</span>
                    </div>
                    <div className={styles.reviewRow}>
                        <span>Priorities</span>
                        <span>{prios.map(p => p.label).join(', ')}</span>
                    </div>
                </div>
            </div>

            <button
                className={styles.submitBtn}
                onClick={() => dispatch({ type: 'SUBMIT' })}
            >
                🚀 CONFIRM MISSION — LAUNCH
            </button>
        </div>
    );
}
