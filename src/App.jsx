import { useMemo } from 'react'
import options from './data/options.json'
import { useFormDispatch, useFormState } from './context/FormContext'

const Icon = ({ children }) => <span className="icon" aria-hidden="true">{children}</span>
const ArrowLeft = () => <Icon>←</Icon>
const ArrowRight = () => <Icon>→</Icon>
const Check = () => <Icon>✓</Icon>
const Compass = () => <Icon>◉</Icon>
const Mail = () => <Icon>✉</Icon>
const RotateCcw = () => <Icon>↻</Icon>
const Send = () => <Icon>➤</Icon>
const Sparkles = () => <Icon>✦</Icon>

const steps = ['Călătorul', 'Destinația', 'Experiența', 'Recapitulare']

function getErrors(state) {
  const { traveler, trip, experience } = state
  return {
    name: !traveler.name.trim() ? 'Spune-ne cum te cheamă.' : traveler.name.trim().length < 3 ? 'Numele trebuie să aibă cel puțin 3 caractere.' : '',
    email: !/^\S+@\S+\.\S+$/.test(traveler.email) ? 'Introdu o adresă de email validă.' : '',
    style: !traveler.style ? 'Alege stilul de călătorie.' : '',
    destination: !trip.destination ? 'Alege o destinație.' : '',
    dates: !trip.startDate || !trip.endDate ? 'Completează ambele date.' : trip.endDate <= trip.startDate ? 'Întoarcerea trebuie să fie după plecare.' : '',
    activities: experience.activities.length < 2 ? 'Selectează cel puțin două activități.' : '',
    accommodation: !experience.accommodation ? 'Alege tipul de cazare.' : '',
    notes: experience.notes.length > 240 ? 'Nota nu poate depăși 240 de caractere.' : ''
  }
}

function Field({ label, error, touched, children }) {
  return <label className="field"><span>{label}</span>{children}{touched && error && <small className="error">{error}</small>}</label>
}

function TextInput({ section, field, type = 'text', label, placeholder, error }) {
  const state = useFormState(); const dispatch = useFormDispatch()
  return <Field label={label} error={error} touched={state.touched[field]}><input className={state.touched[field] && error ? 'invalid' : ''} type={type} value={state[section][field]} placeholder={placeholder} onChange={(e) => dispatch({ type: 'SET_FIELD', section, field, value: e.target.value })} onBlur={() => dispatch({ type: 'TOUCH_FIELD', field })} /></Field>
}

function PersonalStep({ errors }) {
  const state = useFormState(); const dispatch = useFormDispatch()
  return <section className="step-content"><p className="eyebrow">Pasul 01 / 03</p><h2>Cine pornește la drum?</h2><p className="lead">Construiește o aventură care se potrivește ritmului tău.</p><div className="form-grid"><TextInput section="traveler" field="name" label="Numele tău" placeholder="ex. Ana Popescu" error={errors.name} /><TextInput section="traveler" field="email" type="email" label="Email pentru itinerar" placeholder="ana@email.com" error={errors.email} /></div><Field label="Câte persoane călătoresc?" error="" touched={false}><input type="range" min="1" max="8" value={state.traveler.travelers} onChange={(e) => dispatch({ type: 'SET_FIELD', section: 'traveler', field: 'travelers', value: Number(e.target.value) })} /><strong className="range-value">{state.traveler.travelers} {state.traveler.travelers === 1 ? 'persoană' : 'persoane'}</strong></Field><fieldset><legend>Stilul tău de călătorie</legend><div className="choice-grid">{options.travelStyles.map((style) => <label className={`choice ${state.traveler.style === style ? 'selected' : ''}`} key={style}><input type="radio" name="style" checked={state.traveler.style === style} onChange={() => dispatch({ type: 'SET_FIELD', section: 'traveler', field: 'style', value: style })} />{style}</label>)}</div>{state.touched.style && errors.style && <small className="error">{errors.style}</small>}</fieldset></section>
}

function DestinationStep({ errors }) {
  const state = useFormState(); const dispatch = useFormDispatch()
  return <section className="step-content"><p className="eyebrow">Pasul 02 / 03</p><h2>Alege-ți orizontul.</h2><p className="lead">Unde vrei să vezi prima lumină a zilei?</p><fieldset><legend>Destinație</legend><div className="destination-grid">{options.destinations.map((item) => <button type="button" className={`destination ${state.trip.destination === item.id ? 'selected' : ''}`} key={item.id} onClick={() => dispatch({ type: 'SET_FIELD', section: 'trip', field: 'destination', value: item.id })}><span className="destination-emoji">{item.emoji}</span><span><b>{item.label}</b><small>{item.tagline}</small></span>{state.trip.destination === item.id && <Check size={18} />}</button>)}</div>{state.touched.destination && errors.destination && <small className="error">{errors.destination}</small>}</fieldset><div className="form-grid"><TextInput section="trip" field="startDate" type="date" label="Data plecării" error={errors.dates} /><TextInput section="trip" field="endDate" type="date" label="Data întoarcerii" error={errors.dates} /></div><Field label={`Buget estimat: ${state.trip.budget} €`} touched={false}><input type="range" min="500" max="5000" step="100" value={state.trip.budget} onChange={(e) => dispatch({ type: 'SET_FIELD', section: 'trip', field: 'budget', value: Number(e.target.value) })} /></Field></section>
}

function ExperienceStep({ errors }) {
  const state = useFormState(); const dispatch = useFormDispatch()
  return <section className="step-content"><p className="eyebrow">Pasul 03 / 03</p><h2>Umple zilele cu magie.</h2><p className="lead">Alege experiențele care vor face povestea ta memorabilă.</p><fieldset><legend>Activități preferate <span className="hint">(minimum 2)</span></legend><div className="activity-grid">{options.activities.map((activity) => <button type="button" className={`activity ${state.experience.activities.includes(activity.id) ? 'selected' : ''}`} key={activity.id} onClick={() => dispatch({ type: 'TOGGLE_ACTIVITY', activity: activity.id })}><span>{activity.icon}</span>{activity.label}{state.experience.activities.includes(activity.id) && <Check size={16} />}</button>)}</div>{state.touched.activities && errors.activities && <small className="error">{errors.activities}</small>}</fieldset><fieldset><legend>Unde vei dormi?</legend><div className="accommodation-grid">{options.accommodations.map((item) => <label className={`accommodation ${state.experience.accommodation === item.id ? 'selected' : ''}`} key={item.id}><input type="radio" name="accommodation" checked={state.experience.accommodation === item.id} onChange={() => dispatch({ type: 'SET_FIELD', section: 'experience', field: 'accommodation', value: item.id })} /><b>{item.label}</b><small>{item.description}</small><strong>de la {item.price} €/noapte</strong></label>)}</div>{state.touched.accommodation && errors.accommodation && <small className="error">{errors.accommodation}</small>}</fieldset><Field label="O notă pentru ghidul tău" error={errors.notes} touched={state.touched.notes}><textarea value={state.experience.notes} maxLength="240" placeholder="Ce ar trebui să știm despre aventura ta?" onChange={(e) => dispatch({ type: 'SET_FIELD', section: 'experience', field: 'notes', value: e.target.value })} onBlur={() => dispatch({ type: 'TOUCH_FIELD', field: 'notes' })} /></Field><label className="checkline"><input type="checkbox" checked={state.experience.newsletter} onChange={(e) => dispatch({ type: 'SET_FIELD', section: 'experience', field: 'newsletter', value: e.target.checked })} /> Vreau inspirație lunară pentru următoarea aventură.</label></section>
}

function ReviewStep({ errors }) { const state = useFormState(); const destination = options.destinations.find((item) => item.id === state.trip.destination); const stay = options.accommodations.find((item) => item.id === state.experience.accommodation); return <section className="step-content review"><p className="eyebrow">Pasul 04 / 04</p><h2>Totul arată grozav.</h2><p className="lead">Verifică detaliile înainte să trimiți planul de călătorie.</p><div className="review-card"><ReviewRow title="Călător" value={`${state.traveler.name} · ${state.traveler.email}`} /><ReviewRow title="Destinație" value={`${destination?.label || 'Neselectată'} · ${state.trip.startDate || '—'} → ${state.trip.endDate || '—'}`} /><ReviewRow title="Experiență" value={`${stay?.label || 'Fără cazare'} · ${state.experience.activities.length} activități`} /><ReviewRow title="Buget" value={`${state.trip.budget} € pentru ${state.traveler.travelers} persoane`} /></div><div className="review-note"><Sparkles size={18} /> Itinerarul personalizat va fi trimis pe email după confirmare.</div></section> }
function ReviewRow({ title, value }) { return <div className="review-row"><span>{title}</span><b>{value}</b></div> }

function Preview() { const state = useFormState(); const destination = options.destinations.find((item) => item.id === state.trip.destination); const selectedActivities = options.activities.filter((item) => state.experience.activities.includes(item.id)); return <aside className="preview"><div className="preview-label"><span className="live-dot" /> PREVIEW LIVE</div><div className="ticket"><div className="ticket-top"><span>AURORA / 2026</span><Compass size={20} /></div><div className="aurora-art"><span>{destination?.emoji || '✦'}</span><div className="stars">✦ · ˚ ✧ · ✦</div></div><p className="ticket-kicker">JURNAL DE CĂLĂTORIE</p><h3>{destination?.label || 'Alege un nord'}</h3><p className="ticket-tagline">{destination?.tagline || 'Aventura ta începe cu un singur pas.'}</p><div className="ticket-divider" /><div className="ticket-meta"><span><small>EXPLORATOR</small><b>{state.traveler.name || 'Numele tău'}</b></span><span><small>DURATĂ</small><b>{state.trip.startDate && state.trip.endDate ? `${state.trip.startDate} — ${state.trip.endDate}` : 'Alege datele'}</b></span></div>{selectedActivities.length > 0 && <div className="preview-pills">{selectedActivities.map((item) => <span key={item.id}>{item.icon} {item.label}</span>)}</div>}<div className="ticket-footer"><Mail size={14} /> {state.traveler.email || 'email@exemplu.com'}</div></div></aside> }

function App() { const state = useFormState(); const dispatch = useFormDispatch(); const errors = useMemo(() => getErrors(state), [state]); const stepFields = [['name', 'email', 'style'], ['destination', 'startDate', 'endDate'], ['activities', 'accommodation', 'notes'], []]; const stepValid = (step) => { const map = [{ name: errors.name, email: errors.email, style: errors.style }, { destination: errors.destination, startDate: errors.dates, endDate: errors.dates }, { activities: errors.activities, accommodation: errors.accommodation, notes: errors.notes }, {}]; return !Object.values(map[step]).some(Boolean) }
  const next = () => { if (state.currentStep < 3) { const fields = stepFields[state.currentStep]; dispatch({ type: 'VALIDATE_STEP', fields }); if (stepValid(state.currentStep)) dispatch({ type: 'SET_STEP', step: state.currentStep + 1 }) } else dispatch({ type: 'SUBMIT' }) }
  if (state.submitted) return <main className="success-page"><div className="success-orbit"><Check size={42} /></div><p className="eyebrow">PLAN CONFIRMAT</p><h1>Nordul te așteaptă, {state.traveler.name.split(' ')[0] || 'explorator'}!</h1><p>Am salvat preferințele tale și vom trimite itinerarul la <b>{state.traveler.email}</b>.</p><button className="button primary" onClick={() => dispatch({ type: 'RESET' })}><RotateCcw size={17} /> Creează un alt plan</button></main>
  return <main className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark">✦</span><span>AURORA <i>TRIP PLANNER</i></span></div><span className="saved"><span className="live-dot" /> Se salvează automat</span></header><div className="layout"><div className="planner"><div className="stepper">{steps.map((step, index) => <button type="button" className={`step ${index === state.currentStep ? 'active' : ''} ${index < state.currentStep ? 'done' : ''}`} key={step} onClick={() => index < state.currentStep && dispatch({ type: 'SET_STEP', step: index })}><span>{index < state.currentStep ? <Check size={15} /> : `0${index + 1}`}</span>{step}</button>)}</div>{state.currentStep === 0 && <PersonalStep errors={errors} />}{state.currentStep === 1 && <DestinationStep errors={errors} />}{state.currentStep === 2 && <ExperienceStep errors={errors} />}{state.currentStep === 3 && <ReviewStep errors={errors} />}<div className="actions">{state.currentStep > 0 ? <button className="button secondary" onClick={() => dispatch({ type: 'SET_STEP', step: state.currentStep - 1 })}><ArrowLeft size={17} /> Înapoi</button> : <span />}{state.currentStep === 3 ? <button className="button primary" onClick={next}><Send size={17} /> Confirmă planul</button> : <button className="button primary" onClick={next}>Continuă <ArrowRight size={17} /></button>}</div></div><Preview /></div></main> }

export default App
