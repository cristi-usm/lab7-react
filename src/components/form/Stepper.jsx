export default function Stepper({ step }) {
  const steps = [
    {
      label: 'Profile',
      title: 'Basic Information',
      description: 'Tell us who you are as a teacher.'
    },
    {
      label: 'Stats',
      title: 'Your Achievements',
      description: 'Add stats that highlight your experience.'
    },
    {
      label: 'Plans',
      title: 'Pricing Plans',
      description: 'Define your teaching plans and pricing.'
    },
    {
      label: 'Availability',
      title: 'Set Availability',
      description: 'Choose when you are available for sessions.'
    },
  ]

  return (<>
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{steps[step].title}</h1>
      <p className="text-gray-500">{steps[step].description}</p>
    </div>

    <div className="flex gap-4 mb-6">

      {steps.map((s, i) => (
        <div key={i} className={i === step ? 'text-green-500 font-bold' : 'text-gray-400'}>
          {i + 1}. {s.label}
        </div>
      ))}
    </div>
  </>
  )
}
