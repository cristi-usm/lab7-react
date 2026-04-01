import './App.css'
import StepIndicator from './components/StepIndicator'
import LivePreview from './components/LivePreview'
import StepPersonal from './components/steps/StepPersonal'
import StepWorkspace from './components/steps/StepWorkspace'
import StepEquipment from './components/steps/StepEquipment'
import StepReview from './components/steps/StepReview'
import {
  HomeOfficeFormProvider,
  useFormState,
  useFormDispatch,
} from './context/HomeOfficeFormContext'
import { validateForm } from './utils/validation'
import { STEP_FIELDS, STEP_LABELS, REQUIRED_FIELDS } from './utils/stepConfig'

function FormLayout() {
  const state = useFormState()
  const dispatch = useFormDispatch()
  const errors = validateForm(state.formData)
  const isReviewStep = state.currentStep === STEP_LABELS.length - 1

  const handleFieldChange = (field, value) => {
    dispatch({
      type: 'SET_FIELD',
      payload: { field, value },
    })
  }

  const handleFieldBlur = (field) => {
    dispatch({
      type: 'TOUCH_FIELD',
      payload: field,
    })
  }

  const handleCheckboxToggle = (field, value) => {
    dispatch({
      type: 'TOGGLE_CHECKBOX',
      payload: { field, value },
    })
  }

  const goToPreviousStep = () => {
    if (state.currentStep === 0) {
      return
    }

    dispatch({
      type: 'SET_STEP',
      payload: state.currentStep - 1,
    })
  }

  const goToNextStep = () => {
    const fieldsForCurrentStep = STEP_FIELDS[state.currentStep]

    dispatch({
      type: 'VALIDATE_STEP',
      payload: { fields: fieldsForCurrentStep },
    })

    const currentStepHasErrors = fieldsForCurrentStep.some((field) => Boolean(errors[field]))

    if (currentStepHasErrors) {
      return
    }

    dispatch({
      type: 'SET_STEP',
      payload: state.currentStep + 1,
    })
  }

  const submitForm = () => {
    dispatch({
      type: 'VALIDATE_STEP',
      payload: { fields: REQUIRED_FIELDS },
    })

    const formHasErrors = REQUIRED_FIELDS.some((field) => Boolean(errors[field]))

    if (formHasErrors) {
      return
    }

    dispatch({ type: 'SUBMIT' })
  }

  const resetForm = () => {
    dispatch({ type: 'RESET' })
  }

  const stepProps = {
    formData: state.formData,
    errors,
    touched: state.touched,
    onFieldChange: handleFieldChange,
    onFieldBlur: handleFieldBlur,
    onCheckboxToggle: handleCheckboxToggle,
  }

  const renderStep = () => {
    if (state.currentStep === 0) {
      return <StepPersonal {...stepProps} />
    }

    if (state.currentStep === 1) {
      return <StepWorkspace {...stepProps} />
    }

    if (state.currentStep === 2) {
      return <StepEquipment {...stepProps} />
    }

    return <StepReview formData={state.formData} />
  }

  if (state.submitted) {
    return (
      <section className="success-box">
        <h2>Formular trimis cu succes</h2>
        <p>Multumim! Datele au fost salvate.</p>
        <button type="button" onClick={resetForm}>
          Completeaza din nou
        </button>
      </section>
    )
  }

  return (
    <div className="app-shell">
      <h1>Configurator de casa/oficiu</h1>
      <p className="subtitle">Formular pentru alegerea decorului</p>

      <StepIndicator labels={STEP_LABELS} currentStep={state.currentStep} />

      <div className="main-layout">
        <section className="form-panel">{renderStep()}</section>

        <LivePreview formData={state.formData} />
      </div>

      <div className="actions">
        <button type="button" onClick={goToPreviousStep} disabled={state.currentStep === 0}>
          Inapoi
        </button>

        {!isReviewStep && (
          <button type="button" onClick={goToNextStep}>
            Next
          </button>
        )}

        {isReviewStep && (
          <button type="button" onClick={submitForm}>
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <HomeOfficeFormProvider>
      <FormLayout />
    </HomeOfficeFormProvider>
  )
}

export default App
