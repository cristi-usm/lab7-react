import React from "react";
import styles from "../Preview.module.css";
import genders from "../../../data/genders.json";
import levels from "../../../data/levels.json";
import goals from "../../../data/goals.json";

const Stat = ({ label, value }) => (
  <div className={styles.stat}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const PersonalCard = ({ personal }) => {
  const genderLabel = genders.find((g) => g.value === personal.gender)?.label;
  const levelLabel = levels.find((l) => l.value === personal.level)?.label;
  const initials =
    (personal.firstName?.[0] || "") + (personal.lastName?.[0] || "");

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>{initials || "?"}</div>
        <div>
          <p className={styles.name}>
            {`${personal.firstName} ${personal.lastName}`.trim() || "—"}
          </p>
          {levelLabel && <span className={styles.level}>{levelLabel}</span>}
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.grid}>
        {personal.age && <Stat label="Vârstă" value={`${personal.age} ani`} />}
        {personal.weight && (
          <Stat label="Greutate" value={`${personal.weight} kg`} />
        )}
        {personal.height && (
          <Stat label="Înălțime" value={`${personal.height} cm`} />
        )}
        {genderLabel && <Stat label="Gen" value={genderLabel} />}
      </div>
      {personal.goals?.length > 0 && (
        <>
          <div className={styles.divider} />
          <div className={styles.goals}>
            {personal.goals.map((g) => {
              const label = goals.find((goal) => goal.value === g)?.label;
              return (
                <span key={g} className={styles.goalTag}>
                  {label}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalCard;
