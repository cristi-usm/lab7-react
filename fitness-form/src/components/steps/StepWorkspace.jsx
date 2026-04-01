import formOptions from '../../data/formOptions.json'

function FieldError({ visible, message }) {
  if (!visible) {
    return null
  }

  return <p className="error-text">{message}</p>
}

export default function StepWorkspace({
  formData,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
}) {
  return (
    <div className="step-content">
      <h2>Pas 2: Spatiu si buget</h2>

      <label>
        Tip spatiu
        <select
          value={formData.roomType}
          onChange={(event) => onFieldChange('roomType', event.target.value)}
          onBlur={() => onFieldBlur('roomType')}
          className={touched.roomType && errors.roomType ? 'input-error' : ''}
        >
          <option value="">Alege o varianta</option>
          {formOptions.roomTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <FieldError visible={touched.roomType && errors.roomType} message={errors.roomType} />

      <label>
        Buget (EUR)
        <input
          type="number"
          value={formData.budget}
          onChange={(event) => onFieldChange('budget', event.target.value)}
          onBlur={() => onFieldBlur('budget')}
          className={touched.budget && errors.budget ? 'input-error' : ''}
          min="0"
          placeholder="Ex: 800"
        />
      </label>
      <FieldError visible={touched.budget && errors.budget} message={errors.budget} />

      <label>
        Nivel focus dorit (range)
        <div className="range-line">
          <input
            type="range"
            min="1"
            max="10"
            value={formData.focusLevel}
            onChange={(event) => onFieldChange('focusLevel', event.target.value)}
            onBlur={() => onFieldBlur('focusLevel')}
          />
          <span>{formData.focusLevel}</span>
        </div>
      </label>

      <fieldset className={touched.workMode && errors.workMode ? 'input-error-fieldset' : ''}>
        <legend>Mod de lucru (radio)</legend>
        {formOptions.workModes.map((option) => (
          <label key={option.value} className="inline-option">
            <input
              type="radio"
              name="workMode"
              value={option.value}
              checked={formData.workMode === option.value}
              onChange={(event) => onFieldChange('workMode', event.target.value)}
              onBlur={() => onFieldBlur('workMode')}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
      <FieldError visible={touched.workMode && errors.workMode} message={errors.workMode} />
    </div>
  )
}
