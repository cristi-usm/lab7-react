import "./App.css"
import Bio from "./components/Bio.jsx"
import EventDetails from "./components/EventDetails.jsx"
import Preferences from "./components/Preferences.jsx"
import Preview from "./components/Preview.jsx"
import Review from "./components/Review.jsx"
import { useFormStateContext } from "./context/FormContext.jsx"

export default function App() {
  const { step } = useFormStateContext()

  return (
    <div className="app">
      <div className="app-header">
        <h1>Start your own event!</h1>
        <h2>Fill all necessary details</h2>
      </div>
      <div className="app-body">
        <div className="form-panel">
          {step === 1 && <Bio />}
          {step === 2 && <EventDetails />}
          {step === 3 && <Preferences />}
          {step === 4 && <Review />}
        </div>
        <Preview />
      </div>
    </div>
  )
}