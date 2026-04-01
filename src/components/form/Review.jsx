import { useFormState, useFormDispatch } from '../../context/FormContext'

export default function Review() {
  const { values } = useFormState()
  const dispatch = useFormDispatch()

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4 border-b pb-2">Review Profile</h3>
        <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(values, null, 2)}</pre>
      </div>

    </div>
  )
}
