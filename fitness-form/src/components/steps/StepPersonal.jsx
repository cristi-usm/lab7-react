function FieldError({ visible, message }) {
  if (!visible) {
    return null
  }

  return <p className="error-text">{message}</p>
}

export default function StepPersonal({
  formData,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <div className="step-content">
      <h2>Pas 1: Date personale</h2>

      <label>
        Nume complet
        <input
          type="text"
          value={formData.fullName}
          onChange={(event) => onFieldChange('fullName', event.target.value)}
          onBlur={() => onFieldBlur('fullName')}
          className={touched.fullName && errors.fullName ? 'input-error' : ''}
          placeholder="Ex: Grigore Colun"
        />
      </label>
      <FieldError visible={touched.fullName && errors.fullName} message={errors.fullName} />

      <label>
        Email
        <input
          type="text"
          value={formData.email}
          onChange={(event) => onFieldChange('email', event.target.value)}
          onBlur={() => onFieldBlur('email')}
          className={touched.email && errors.email ? 'input-error' : ''}
          placeholder="Ex: gregcolun@gmail.com"
        />
      </label>
      <FieldError visible={touched.email && errors.email} message={errors.email} />

      <label>
        Data dorita pentru setup
        <input
          type="date"
          value={formData.startDate}
          onChange={(event) => onFieldChange('startDate', event.target.value)}
          onBlur={() => onFieldBlur('startDate')}
          className={touched.startDate && errors.startDate ? 'input-error' : ''}
        />
      </label>
      <FieldError
        visible={touched.startDate && errors.startDate}
        message={errors.startDate}
      />
    </div>
  )
}
