import "./UI.css";

export function StepHdr({ nr, titlu, sub }) {
    return (
        <div className="ui-step-hdr">
            <div className="ui-step-nr">PAS {nr} / 4</div>
            <h1 className="ui-step-title">{titlu}</h1>
            <p className="ui-step-sub">{sub}</p>
        </div>
    );
}

export function SecLbl({ children }) {
    return <div className="ui-sec-lbl">{children}</div>;
}

export function Nav({ onBack, onNext, nextDis, nextLbl }) {
    return (
        <div className="ui-nav-container">
            {onBack && (
                <button className="btn-back" onClick={onBack}>
                    ← Înapoi
                </button>
            )}
            <button
                className="btn-next"
                disabled={nextDis}
                onClick={onNext}
            >
                {nextLbl}
            </button>
        </div>
    );
}