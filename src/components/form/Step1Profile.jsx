import { useFormDispatch, useFormState } from '../../context/FormContext'

export default function Step1Profile() {
  const { values } = useFormState()
  const dispatch = useFormDispatch()

  return (
    <div className="flex flex-col gap-3">
      <input
        className="border p-2 rounded"
        placeholder="First Name"
        value={values.firstName}
        onChange={e =>
          dispatch({ type: 'SET_FIELD', field: 'firstName', value: e.target.value })
        }
      />

      <input
        className="border p-2 rounded"
        placeholder="Last Name"
        value={values.lastName}
        onChange={e =>
          dispatch({ type: 'SET_FIELD', field: 'lastName', value: e.target.value })
        }
      />

      <input
        className="border p-2 rounded"
        placeholder="Username"
        value={values.username}
        onChange={e =>
          dispatch({ type: 'SET_FIELD', field: 'username', value: e.target.value })
        }
      />

      <textarea
        className="border p-2 rounded h-32"
        placeholder="Bio"
        value={values.bio}
        onChange={e =>
          dispatch({ type: 'SET_FIELD', field: 'bio', value: e.target.value })
        }
      />
    </div>
  )
}
