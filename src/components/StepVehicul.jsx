import "./StepVehicul.css";
import { MODELE, ANI, MOTORIZARI } from "../data/catalog";
import { StepHdr, SecLbl, Nav } from "./UI";
import { sel_css } from "../styles";
import { useAppState, useAppActions } from "../store/AppContext";

export default function StepVehicul() {
    const { marca, model, an, motor } = useAppState();
    const { setModel, setAn, setMotor, setPas } = useAppActions();

    return (
        <div className="step-vehicul-container">
            <StepHdr
                nr={2}
                titlu={`Configurează ${marca.nume}`}
                sub="Alege modelul, anul de fabricație și motorizarea pentru piese precise."
            />

            <SecLbl>Model</SecLbl>
            <div className="model-grid">
                {(MODELE[marca.id] || []).map(m => (
                    <div
                        key={m.id}
                        className={`model-card ${model?.id === m.id ? "sel" : ""}`}
                        onClick={() => setModel(m)}
                    >
                        <div className="model-name">{m.nume}</div>
                    </div>
                ))}
            </div>

            <div className="select-row">
                <div>
                    <SecLbl>An fabricație</SecLbl>
                    <select style={sel_css} value={an} onChange={e => setAn(e.target.value)}>
                        <option value="">Selectează anul</option>
                        {ANI.map(y => <option key={y}>{y}</option>)}
                    </select>
                </div>
                <div>
                    <SecLbl>Motorizare</SecLbl>
                    <select style={sel_css} value={motor} onChange={e => setMotor(e.target.value)}>
                        <option value="">Selectează motorizarea</option>
                        {(MOTORIZARI[marca.id] || []).map(mt => <option key={mt}>{mt}</option>)}
                    </select>
                </div>
            </div>

            {model && an && motor && (
                <div className="conf-card">
                    <div className="conf-flag">{marca.tara}</div>
                    <div className="conf-info">
                        <div className="conf-title">
                            {marca.nume} {model.nume}
                        </div>
                        <div className="conf-subtitle">
                            {an} · {motor}
                        </div>
                    </div>
                    <div className="conf-badge">
                        ✓ Confirmat
                    </div>
                </div>
            )}

            <Nav
                onBack={() => setPas(1)}
                onNext={() => setPas(3)}
                nextDis={!model || !an || !motor}
                nextLbl="Continuă → Piese"
            />
        </div>
    );
}