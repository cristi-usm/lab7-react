import { useFormDispatch, useFormState } from '../../context/FormContext'
import Input from '../ui/Input'
import Button from '../ui/Button'

export default function Step2Stats() {
  const { values } = useFormState()
  const dispatch = useFormDispatch()

  return (
    <div className="flex flex-col gap-4">
      {values.stats.map((stat, i) => (
        <div key={i} className="flex gap-2 items-center">
          <Input
            className="border p-2 rounded flex-1"
            placeholder="Label (e.g. Exp.)"
            value={stat.label}
            onChange={e => {
              const newStats = [...values.stats]
              newStats[i].label = e.target.value
              dispatch({ type: 'SET_FIELD', field: 'stats', value: newStats })
            }}
          />
          <Input
            className="border p-2 rounded flex-1"
            placeholder="Value (e.g. 5 yrs)"
            value={stat.value}
            onChange={e => {
              const newStats = [...values.stats]
              newStats[i].value = e.target.value
              dispatch({ type: 'SET_FIELD', field: 'stats', value: newStats })
            }}
          />
          <Button 
            variant="danger"
            className="p-2 text-red-500 hover:bg-red-50 rounded"
            onClick={() => dispatch({ type: 'REMOVE_STAT', index: i })}
          >
            x
          </Button>
        </div>
      ))}

      <Button 
        variant='secondary'
        className="mt-2 p-2 border-2 border-dashed border-green-500 text-green-600 rounded hover:bg-green-50"
        onClick={() => dispatch({ type: 'ADD_STAT' })}
      >
        + Add Stat
      </Button>
    </div>
  )
}
