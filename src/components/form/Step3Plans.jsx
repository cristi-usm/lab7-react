import { useFormDispatch, useFormState } from '../../context/FormContext'
import planTypes from '../../data/planTypes.json'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function Step3Plans() {
  const { values } = useFormState()
  const dispatch = useFormDispatch()

  const updatePlan = (index, field, value) => {
    const copy = [...values.plans]
    copy[index][field] = value
    dispatch({ type: 'SET_FIELD', field: 'plans', value: copy })
  }

  const toggleBenefit = (planIndex, benefit) => {
    const copy = [...values.plans]
    const benefits = copy[planIndex].benefits
    if (benefits.includes(benefit)) {
      copy[planIndex].benefits = benefits.filter(b => b !== benefit)
    } else {
      copy[planIndex].benefits = [...benefits, benefit]
    }
    dispatch({ type: 'SET_FIELD', field: 'plans', value: copy })
  }

  return (
    <div className="flex flex-col gap-6">
      {values.plans.map((plan, i) => (
        <div key={i} className="border p-4 rounded-lg relative bg-white shadow-sm">
          <button 
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            onClick={() => {
              const copy = values.plans.filter((_, idx) => idx !== i)
              dispatch({ type: 'SET_FIELD', field: 'plans', value: copy })
            }}
          >
            ✕
          </button>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <Input
                label="Plan Label"
                className="border p-2 rounded"
                placeholder="Basic / Pro / Mastery"
                value={plan.label}
                onChange={e => updatePlan(i, 'label', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <Input
                label="Price (LEI)"
                className="border p-2 rounded"
                type="number"
                placeholder="Price"
                value={plan.amount}
                onChange={e => updatePlan(i, 'amount', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-semibold uppercase text-gray-500 block mb-2">Plan Type</label>
            <select 
              className="border p-2 rounded w-full"
              value={plan.type}
              onChange={e => updatePlan(i, 'type', e.target.value)}
            >
              <option value="">Select a type...</option>
              {planTypes.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-gray-500 block mb-2">Benefits</label>
            <div className="grid grid-cols-2 gap-2">
              {['1-on-1 Sessions', 'Group Chat', 'Resource Library', 'Certificate'].map(benefit => (
                <label key={benefit} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plan.benefits?.includes(benefit)}
                    onChange={() => toggleBenefit(i, benefit)}
                  />
                  {benefit}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Button 
        variant='secondary'
        className="mt-2 p-2 border-2 border-dashed border-green-500 text-green-600 rounded hover:bg-green-50"
        onClick={() => dispatch({ type: 'ADD_PLAN' })}
      >
        + Add Plan
      </Button>
    </div>
  )
}
