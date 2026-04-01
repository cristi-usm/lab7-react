import "./StepPiese.css";
import { CATALOG, CAT_CFG } from "../data/catalog";
import { useAppState, useAppActions, useCosTotal } from "../store/AppContext";

export default function StepPiese() {
    const { marca, model, an, cos, filtCat } = useAppState();
    const { setFiltCat, toggleCos, setQty, setPas } = useAppActions();
    const cosTotal = useCosTotal();

    const pieseFiltrate = CATALOG
        .filter(p => marca ? p.marci.includes(marca.id) : true)
        .filter(p => filtCat === "Toate" || p.cat === filtCat);

    const inCos = id => cos.find(i => i.piesa.id === id);

    return (
        <div className="step-piese-container">

            <div className="catalog-section">
                <div className="filter-bar">
          <span className="filter-info">
            Piese compatibile · <span>{marca.nume} {model.nume} {an}</span>
          </span>
                    <div className="filter-pills">
                        {["Toate", ...Object.keys(CAT_CFG)].map(cat => {
                            const c = CAT_CFG[cat];
                            const a = filtCat === cat;
                            return (
                                <span
                                    key={cat}
                                    className="cat-pill"
                                    onClick={() => setFiltCat(cat)}
                                    style={{
                                        border: `1px solid ${a ? (c?.border || "#383a3d") : "#222325"}`,
                                        background: a ? (c?.bg || "#242527") : "transparent",
                                        color: a ? (c?.text || "#e8e6e1") : "#5c5a56",
                                    }}
                                >
                  {cat}
                </span>
                            );
                        })}
                    </div>
                </div>

                <div className="piese-grid">
                    {pieseFiltrate.map(p => {
                        const sel = !!inCos(p.id);
                        const c = CAT_CFG[p.cat];
                        return (
                            <div
                                key={p.id}
                                className={`piesa-card ${sel ? "sel" : ""}`}
                                style={{ borderTop: `2px solid ${c.acc}` }}
                            >
                                <div className="piesa-header">
                                    <span className="piesa-name">{p.nume}</span>
                                    <span className="piesa-tag" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                    {p.cat}
                  </span>
                                </div>
                                <p className="piesa-desc">{p.desc}</p>
                                <div className="piesa-footer">
                                    <div className="piesa-price">
                                        {p.pret.toLocaleString("ro-RO")} <span>Lei</span>
                                    </div>
                                    <button
                                        onClick={() => toggleCos(p)}
                                        className="add-btn"
                                        style={{
                                            background: sel ? "#e8610a18" : "#1c1d1f",
                                            border: `1px solid ${sel ? "#e8610a" : "#2a2b2e"}`,
                                            color: sel ? "#e8610a" : "#9a9790",
                                        }}
                                    >
                                        {sel ? "✓ Adăugat" : "+ Adaugă"}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {pieseFiltrate.length === 0 && (
                        <div className="no-results">
                            Nicio piesă compatibilă în această categorie.
                        </div>
                    )}
                </div>
            </div>

            <div className="cart-sidebar">
                <div className="cart-header">
                    <span className="cart-header-title">Coș · {cos.length} piese</span>
                </div>

                <div className="cart-items">
                    {cos.length === 0 ? (
                        <div className="empty-cart">
                            Nicio piesă selectată.<br />Apasă <strong style={{ color: "#5c5a56", fontWeight: 500 }}>+ Adaugă</strong>.
                        </div>
                    ) : cos.map(({ piesa, qty }) => (
                        <div
                            key={piesa.id}
                            className="cart-card"
                            style={{ borderLeft: `3px solid ${CAT_CFG[piesa.cat].acc}` }}
                        >
                            <div className="cart-card-title">{piesa.nume}</div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div className="qty-control">
                                    <button className="qty-btn" onClick={() => setQty(piesa.id, qty - 1)}>−</button>
                                    <span className="qty-val">{qty}</span>
                                    <button className="qty-btn" onClick={() => setQty(piesa.id, qty + 1)}>+</button>
                                </div>
                                <span className="cart-card-price">
                  {(piesa.pret * qty).toLocaleString("ro-RO")} L
                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-footer">
                    <div className="total-row">
                        <span style={{ color: "#9a9790" }}>Total</span>
                        <span style={{ color: "#e8610a", fontWeight: 500 }}>{cosTotal.toLocaleString("ro-RO")} Lei</span>
                    </div>
                    <button
                        disabled={cos.length === 0}
                        onClick={() => setPas(4)}
                        className="summary-btn"
                        style={{
                            background: cos.length ? "#e8610a" : "#1c1d1f",
                            border: cos.length ? "none" : "1px solid #2a2b2e",
                            color: cos.length ? "#fff" : "#3c3a36",
                            cursor: cos.length ? "pointer" : "not-allowed",
                        }}
                    >
                        Sumar →
                    </button>
                    <button onClick={() => setPas(2)} className="back-btn">
                        ← Înapoi
                    </button>
                </div>
            </div>
        </div>
    );
}