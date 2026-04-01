import { useFormState } from '../../context/FormContext'

const normalizeDays = (day) => {
  switch (day) {
    case 'MONDAY': return 'Luni'
    case 'TUESDAY': return 'Marți'
    case 'WEDNESDAY': return 'Miercuri'
    case 'THURSDAY': return 'Joi'
    case 'FRIDAY': return 'Vineri'
    case 'SATURDAY': return 'Sâmbătă'
    case 'SUNDAY': return 'Duminică'
    default: return day
  }
}

const formatTime = (time) => {
  const hour = time / 60
  return `${hour - 1}:00 - ${hour}:00`
}

export default function TeacherAvailabilityPreview() {
  const { values } = useFormState()
  const dayOrder = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']

  if (!values.slots.length) return null

  const grouped = values.slots.reduce((acc, slot) => {
    if (!acc[slot.day]) acc[slot.day] = []
    acc[slot.day].push(slot.time)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-semibold">Disponibilitate</h3>

      <div className="flex flex-wrap gap-6">
        {Object.entries(grouped).sort(([a], [b]) => dayOrder.indexOf(a) - dayOrder.indexOf(b)).map(([day, times]) => (
          <div
            key={day}
            className="bg-slate-200 p-6 rounded-lg border border-slate-700 flex flex-col gap-3"
          >
            <div className="text-lg font-semibold text-slate-800">
              {normalizeDays(day)}
            </div>

            <ul className="text-sm text-zinc-700">
              {times.sort((a, b) => a - b).map((time, i) => (
                <li key={i}>• {formatTime(time)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}