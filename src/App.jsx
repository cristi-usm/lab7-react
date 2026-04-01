import { FormProvider, useFormState, useFormDispatch } from './context/FormContext'
import Stepper from './components/form/Stepper'
import Step1Profile from './components/form/Step1Profile'
import Step2Stats from './components/form/Step2Stats'
import Step3Plans from './components/form/Step3Plans'
import Step4Availability from './components/form/Step4Availability'
import TeacherHero from './components/preview/TeacherHero'
import TeacherPricing from './components/preview/TeacherPricing'
import TeacherAvailability from './components/preview/TeacherAvailability'
import Button from './components/ui/Button'

function Form() {
  const { step, submitted } = useFormState()
  const dispatch = useFormDispatch()

  const next = () => dispatch({ type: 'SET_STEP', step: step + 1 })
  const back = () => dispatch({ type: 'SET_STEP', step: step - 1 })

  if (submitted) {
    return (<>
      <div className="top-12 flex flex-col gap-6 p-20">
        <TeacherHero />
        <TeacherPricing />
        <TeacherAvailability />
        <div>
          <Button onClick={() => dispatch({ type: 'RESET' })}>Create Another Profile</Button>
        </div>
      </div>
    </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* FORM SIDE */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <Stepper step={step} />

          <div className="min-h-[400px] mb-10">
            {step === 0 && <Step1Profile />}
            {step === 1 && <Step2Stats />}
            {step === 2 && <Step3Plans />}
            {step === 3 && <Step4Availability />}
          </div>

          <div className="flex justify-between items-center border-t pt-6">
            <Button 
              variant="secondary" 
              onClick={back} 
              disabled={step === 0}
            >
              ← Back
            </Button>
            
            <div className="text-sm font-medium text-gray-400">
              Step {step + 1} of 4
            </div>

            {step < 3 && (
              <Button onClick={next}>
                Next Step →
              </Button>
            )}

            {step === 3 && (
              <Button 
                className="bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg"
                onClick={() => dispatch({ type: 'SUBMIT' })}
              >
                Complete & Submit Profile
              </Button>
            )}
          </div>
        </div>

        {/* PREVIEW */}
        <div className="flex-1">
          <div className="top-12 flex flex-col gap-6 sticky">
            <TeacherHero />
            <TeacherPricing />
            <TeacherAvailability />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <FormProvider>
      <Form />
    </FormProvider>
  )
}
