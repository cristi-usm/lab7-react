import formOptions from '../data/formOptions.json'

function getLabel(list, value) {
  const found = list.find((item) => item.value === value)
  return found ? found.label : '-'
}

export default function LivePreview({ formData }) {
  return (
    <aside className="preview-panel">
      <h3>Live Preview</h3>

      <div className="preview-card">
        <p className="preview-name">{formData.fullName || 'Nume necompletat'}</p>
        <p>{formData.email || 'Email necompletat'}</p>
      </div>

      <div className="preview-row">
        <span>Data start:</span>
        <strong>{formData.startDate || '-'}</strong>
      </div>

      <div className="preview-row">
        <span>Spatiu:</span>
        <strong>{getLabel(formOptions.roomTypes, formData.roomType)}</strong>
      </div>

      <div className="preview-row">
        <span>Buget:</span>
        <strong>{formData.budget ? `${formData.budget} EUR` : '-'}</strong>
      </div>

      <div className="preview-row">
        <span>Focus (range):</span>
        <strong>{formData.focusLevel}/10</strong>
      </div>

      <div className="preview-row">
        <span>Mod lucru:</span>
        <strong>{getLabel(formOptions.workModes, formData.workMode)}</strong>
      </div>

      <div className="preview-row preview-column">
        <span>Echipamente:</span>
        <strong>
          {formData.equipment.length > 0
            ? formData.equipment
                .map((value) => getLabel(formOptions.equipmentOptions, value))
                .join(', ')
            : '-'}
        </strong>
      </div>

      <div className="preview-row">
        <span>Tema culoare:</span>
        <strong>{getLabel(formOptions.colorThemes, formData.colorTheme)}</strong>
      </div>

      <div className="preview-row preview-column">
        <span>Note:</span>
        <strong>{formData.notes || '-'}</strong>
      </div>
    </aside>
  )
}
