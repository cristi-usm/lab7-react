import { useState } from 'react'
import TimeSlot from './TimeSlot'
import { useFormDispatch, useFormState } from '../../context/FormContext'

const daysOfWeek = [
  'MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY'
]

const normalizeDays = (day) => {
  switch (day) {
    case 'MONDAY': return 'Monday'
    case 'TUESDAY': return 'Tuesday'
    case 'WEDNESDAY': return 'Wednesday'
    case 'THURSDAY': return 'Thursday'
    case 'FRIDAY': return 'Friday'
    case 'SATURDAY': return 'Saturday'
    case 'SUNDAY': return 'Sunday'
    default: return day
  }
}

export default function TimeSlots() {
  const { values } = useFormState()
  const dispatch = useFormDispatch()

  const start = 60 * 11
  const hours = 12
  const duration = 60

  const [openDay, setOpenDay] = useState(null)

  const isSelected = (day, time) =>
    values.slots.some(s => s.day === day && s.time === time)

  const toggleSlot = (day, time) => {
    const exists = values.slots.some(s => s.day === day && s.time === time)

    const newSlots = exists
      ? values.slots.filter(s => !(s.day === day && s.time === time))
      : [...values.slots, { day, time }]

    dispatch({ type: 'SET_FIELD', field: 'slots', value: newSlots })
  }

  return (
    <div className="w-full rounded-md border border-slate-700 overflow-hidden">
      {daysOfWeek.map(day => (
        <div key={day} className="border-b border-slate-700/50">
          
          {/* HEADER */}
          <div
            className="w-full p-3 flex items-center justify-between bg-zinc-300/80 text-slate-800 cursor-pointer"
            onClick={() => setOpenDay(openDay === day ? null : day)}
          >
            <span>{normalizeDays(day)}</span>
            <span>{openDay === day ? '−' : '+'}</span>
          </div>

          {/* CONTENT */}
          {openDay === day && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 bg-zinc-300/50 text-slate-800">
              {[...Array(hours)].map((_, i) => {
                const time = start + (i * duration)
                const selected = isSelected(day, time)

                const startHour = (i * duration + start) / duration - 1
                const endHour = startHour + 1

                return (
                  <TimeSlot
                    key={`${day}-${i}`}
                    type={selected ? 'selected' : 'default'}
                    onClick={() => toggleSlot(day, time)}
                  >
                    <span className="text-sm">
                      {startHour}-{endHour}
                    </span>
                  </TimeSlot>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}