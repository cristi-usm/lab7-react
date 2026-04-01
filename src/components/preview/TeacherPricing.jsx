import { useFormState } from '../../context/FormContext'
import Button from '../ui/Button'

export default function TeacherPricing() {
  const { values } = useFormState()

  if (values.plans.length === 0) return null

  return (<>
  <div class="flex flex-col gap-6">
    <h3 class="text-xl font-semibold">Tarife</h3>
    <div class="flex flex-wrap gap-6">
      {values.plans.map((plan, i) => (
        <div key={plan.type} className="bg-slate-200 p-6 rounded-lg border border-slate-700 flex flex-col gap-4 min-w-80">
          <div className="text-sm text-emerald-400">{plan.label}</div>
          <div className="text-2xl font-bold text-slate-800">{plan.amount} LEI</div>
          <p className="text-sm text-zinc-600">
            {plan.type === 'session' && 'Plătește pentru fiecare sesiune individuală.'}
            {plan.type === 'course' && 'Plătește pentru accesul complet la un curs.'}
            {plan.type === 'subscription' && 'Plătește o taxă lunară pentru acces nelimitat.'}
          </p>
          <ul className="text-sm text-zinc-800">
            {plan.benefits?.map((benefit, idx) => (
              <li key={idx}>• {benefit}</li>
            ))}
          </ul>
          <Button className="bg-slate-700 hover:bg-emerald-600 px-4 py-2 rounded-md text-sm cursor-pointer">Alege</Button>
        </div>
      ))}
    </div>
  </div>
  </>)
}
