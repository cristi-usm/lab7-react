import { useFormState } from '../context/FormContext';
import destinations from '../data/destinations.json';
import spacecraft from '../data/spacecraft.json';
import styles from './LivePreview.module.css';

export default function LivePreview() {
    const { fields, currentStep } = useFormState();

    const dest = destinations.find(d => d.value === fields.destination);
    const ship = spacecraft.find(s => s.value === fields.spacecraft);
    const totalWeight = fields.equipment.length * 50; // approx

    const completion = [
        fields.firstName || fields.lastName,
        fields.destination,
        fields.spacecraft,
    ].filter(Boolean).length;

    const completionPct = Math.round((completion / 3) * 100);

    return (
        <aside className={styles.preview}>
            <div className={styles.header}>
                <span className={styles.live}>◉ LIVE</span>
                <span className={styles.headerTitle}>Mission Card</span>
            </div>

            <div className={styles.card}>
                <div className={styles.cardBanner}>
                    <div className={styles.missionCode}>
                        {fields.missionName
                            ? fields.missionName.toUpperCase().slice(0, 20)
                            : 'UNNAMED MISSION'}
                    </div>
                    <div className={styles.destBadge}>
                        {dest ? dest.label : '— No Destination —'}
                    </div>
                </div>

                <div className={styles.astronautRow}>
                    <div className={styles.avatar}>
                        {fields.firstName ? fields.firstName[0].toUpperCase() : '?'}
                        {fields.lastName ? fields.lastName[0].toUpperCase() : '?'}
                    </div>
                    <div>
                        <div className={styles.astronautName}>
                            {fields.firstName || fields.lastName
                                ? `${fields.firstName} ${fields.lastName}`.trim()
                                : 'Unknown Astronaut'}
                        </div>
                        <div className={styles.astronautMeta}>
                            {fields.role ? fields.role.replace('_', ' ').toUpperCase() : 'No Role Assigned'}
                        </div>
                    </div>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Vessel</span>
                        <span className={styles.statValue}>{ship ? `${ship.icon} ${ship.label}` : '—'}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Launch</span>
                        <span className={styles.statValue}>{fields.launchDate || '—'}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Duration</span>
                        <span className={styles.statValue}>{fields.duration ? `${fields.duration}d` : '—'}</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Budget</span>
                        <span className={styles.statValue}>${fields.budget}B</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Equipment</span>
                        <span className={styles.statValue}>{fields.equipment.length} items</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Weight</span>
                        <span className={styles.statValue}>{totalWeight} kg</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Danger Level</span>
                        <span className={`${styles.statValue} ${dest?.danger >= 7 ? styles.danger : ''}`}>
                            {dest ? `${dest.danger}/10` : '—'}
                        </span>
                    </div>
                </div>

                <div className={styles.readiness}>
                    <div className={styles.readinessLabel}>MISSION READINESS</div>
                    <div className={styles.bar}>
                        <div className={styles.barFill} style={{ width: `${completionPct}%` }} />
                    </div>
                    <div className={styles.readinessPct}>{completionPct}%</div>
                </div>

                {fields.priorities.length > 0 && (
                    <div className={styles.tags}>
                        {fields.priorities.slice(0, 3).map(p => (
                            <span key={p} className={styles.tag}>{p.replace(/_/g, ' ')}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.footer}>
                Step {currentStep + 1} of 4
            </div>
        </aside>
    );
}
