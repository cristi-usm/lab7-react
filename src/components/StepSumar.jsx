import "./StepSumar.css";
import { CAT_CFG } from "../data/catalog";
import { StepHdr } from "./UI";
import { useAppState, useAppActions, useCosTotal } from "../store/AppContext";

export default function StepSumar() {
    const { marca, model, an, motor, cos } = useAppState();
    const { setPas, reset } = useAppActions();
    const cosTotal = useCosTotal();
    const tva = Math.round(cosTotal * 0.19);
    const total = cosTotal + tva;

    return (
        <div className="sumar-container">
            <StepHdr nr={4} titlu="Sumar comandă" sub="Verifică configurația completă înainte de a finaliza comanda." />

            <div className="vehicul-card">
                <div className="vehicul-flag">{marca.tara}</div>
                <div>
                    <div className="vehicul-title">
                        {marca.nume} {model.nume}
                    </div>
                    <div className="vehicul-details">
                        {an} · {motor}
                    </div>
                </div>
            </div>

            <div className="piese-list">
                {cos.map(({ piesa, qty }) => {
                    const c = CAT_CFG[piesa.cat];
                    return (
                        <div key={piesa.id} className="sumar-piesa-card">
                            <div className="piesa-accent" style={{ background: c.acc }} />
                            <div className="piesa-body">
                                <div className="piesa-name">{piesa.nume}</div>
                                <span className="piesa-tag" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                  {piesa.cat}
                </span>
                            </div>
                            <div className="piesa-pricing">
                                <div className="piesa-total-price">
                                    {(piesa.pret * qty).toLocaleString("ro-RO")} Lei
                                </div>
                                {qty > 1 && (
                                    <div className="piesa-qty-breakdown">
                                        {qty} × {piesa.pret.toLocaleString("ro-RO")}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="totale-card">
                <div className="totale-row">
                    <span>Subtotal (fără TVA)</span>
                    <span className="totale-val">{cosTotal.toLocaleString("ro-RO")} Lei</span>
                </div>
                <div className="totale-row">
                    <span>TVA 19%</span>
                    <span className="totale-val">{tva.toLocaleString("ro-RO")} Lei</span>
                </div>
                <div className="grand-total-row">
                    <span>TOTAL</span>
                    <span className="grand-total-val">
            {total.toLocaleString("ro-RO")} Lei
          </span>
                </div>
            </div>

            <div className="actions-row">
                <button onClick={() => setPas(3)} className="btn-modify">
                    ← Modifică
                </button>
                <button className="btn-finalize">
                    Finalizează comanda
                </button>
            </div>

            <button onClick={reset} className="btn-reset">
                Comandă nouă
            </button>
        </div>
    );
}