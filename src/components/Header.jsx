import "./Header.css"; // Importă noul fișier
import { PASI } from "../data/catalog";
import { useAppState, useCosTotal } from "../store/AppContext";

export default function Header() {
    const { pas, cos } = useAppState();
    const cosTotal = useCosTotal();

    return (
        <header className="header-container">
            {/* Logo */}
            <div className="logo-wrapper">
                <div className="logo-hexagon" />
                <span className="logo-text">
          Auto<span className="text-orange">Parts</span>{" "}
                    <span className="text-builder">Builder</span>
        </span>
            </div>

            {/* Stepper */}
            <div className="stepper-container">
                {PASI.map((p, i) => {
                    const activ = pas === p.nr;
                    const done = pas > p.nr;

                    return (
                        <div key={p.nr} style={{ display: "flex", alignItems: "center" }}>
                            <div className={`step-item ${done || activ ? "is-visible" : ""}`}>
                                <div className={`step-circle ${done ? "is-done" : ""} ${activ ? "is-active" : ""}`}>
                                    {done ? "✓" : p.nr}
                                </div>
                                <div>
                                    <div className={`step-title ${activ ? "active" : done ? "done" : ""}`}>
                                        {p.titlu}
                                    </div>
                                    <div className="step-subtitle">{p.sub}</div>
                                </div>
                            </div>

                            {i < PASI.length - 1 && <div className="step-divider" />}
                        </div>
                    );
                })}
            </div>

            {/* Total coș */}
            <div className={`cart-info ${cos.length > 0 ? "has-items" : ""}`}>
                {cos.length > 0
                    ? `${cos.length} piese · ${cosTotal.toLocaleString("ro-RO")} Lei`
                    : "0 piese selectate"}
            </div>
        </header>
    );
}