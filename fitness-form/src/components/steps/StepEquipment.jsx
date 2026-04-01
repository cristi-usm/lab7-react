import formOptions from '../../data/formOptions.json'

function FieldError({ visible, message }) {
  if (!visible) {
    return null
  }

  return <p className="error-text">{message}</p>
}

export default function StepEquipment({
  formData,
  errors,
  touched,
  onFieldChange,
  onFieldBlur,
  onCheckboxToggle,
}) {
  return (
    <div className="step-content">
      <h2>Pas 3: Preferinte</h2>

      <fieldset className={touched.equipment && errors.equipment ? 'input-error-fieldset' : ''}>
        <legend>Echipamente dorite (checkbox)</legend>
        {formOptions.equipmentOptions.map((option) => (
          <label key={option.value} className="inline-option">
            <input
              type="checkbox"
              checked={formData.equipment.includes(option.value)}
              onChange={() => onCheckboxToggle('equipment', option.value)}
              onBlur={() => onFieldBlur('equipment')}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
      <FieldError visible={touched.equipment && errors.equipment} message={errors.equipment} />

      <label>
        Tema de culoare (select)
        <select
          value={formData.colorTheme}
          onChange={(event) => onFieldChange('colorTheme', event.target.value)}
          onBlur={() => onFieldBlur('colorTheme')}
          className={touched.colorTheme && errors.colorTheme ? 'input-error' : ''}
        >
          <option value="">Alege o tema</option>
          {formOptions.colorThemes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <FieldError
        visible={touched.colorTheme && errors.colorTheme}
        message={errors.colorTheme}
      />

      <label>
        Note suplimentare (textarea)
        <textarea
          rows="4"
          value={formData.notes}
          onChange={(event) => onFieldChange('notes', event.target.value)}
          onBlur={() => onFieldBlur('notes')}
          className={touched.notes && errors.notes ? 'input-error' : ''}
          placeholder="Ex: vreau setup simplu, cu multe plante"
        />
      </label>
      <FieldError visible={touched.notes && errors.notes} message={errors.notes} />
    </div>
  )
}
