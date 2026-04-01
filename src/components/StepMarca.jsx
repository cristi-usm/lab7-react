import "./StepMarca.css";
import { MARCI } from "../data/catalog";
import { StepHdr, Nav } from "./UI";
import { useAppState, useAppActions } from "../store/AppContext";

export default function StepMarca() {
    const { marca } = useAppState();
    const { setMarca, setPas } = useAppActions();

    return (
        <div className="step-marca-container">
            <StepHdr
                nr={1}
                titlu="Alege marca vehiculului"
                sub="Selectează producătorul mașinii tale pentru a vedea piese compatibile."
            />

            <div className="marca-grid">
                {MARCI.map((m) => (
                    <div
                        key={m.id}
                        className={`marca-card ${marca?.id === m.id ? "sel" : ""}`}
                        onClick={() => setMarca(m)}
                    >
                        <div className="marca-flag">{m.tara}</div>
                        <div className="marca-name">{m.nume}</div>
                        <div className="marca-bar" />
                    </div>
                ))}
            </div>

            <Nav
                onNext={() => setPas(2)}
                nextDis={!marca}
                nextLbl="Continuă → Vehicul"
            />
        </div>
    );
}