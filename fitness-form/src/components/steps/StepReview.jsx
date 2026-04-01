import formOptions from '../../data/formOptions.json'

function getLabel(list, value) {
  const found = list.find((item) => item.value === value)
  return found ? found.label : '-'
}

export default function StepReview({ formData }) {
  const selectedEquipment = formData.equipment.map((value) =>
    getLabel(formOptions.equipmentOptions, value),
  )

  return (
    <div className="step-content">
      <h2>Pas 4: Review</h2>

      <div className="review-section">
        <h4>Date personale</h4>
        <p><strong>Nume:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Data start:</strong> {formData.startDate}</p>
      </div>

      <div className="review-section">
        <h4>Spatiu si buget</h4>
        <p><strong>Tip spatiu:</strong> {getLabel(formOptions.roomTypes, formData.roomType)}</p>
        <p><strong>Buget:</strong> {formData.budget} EUR</p>
        <p><strong>Focus:</strong> {formData.focusLevel}/10</p>
        <p><strong>Mod lucru:</strong> {getLabel(formOptions.workModes, formData.workMode)}</p>
      </div>

      <div className="review-section">
        <h4>Preferinte</h4>
        <p>
          <strong>Echipamente:</strong>{' '}
          {selectedEquipment.length > 0 ? selectedEquipment.join(', ') : '-'}
        </p>
        <p><strong>Tema culoare:</strong> {getLabel(formOptions.colorThemes, formData.colorTheme)}</p>
        <p><strong>Note:</strong> {formData.notes}</p>
      </div>
    </div>
  )
}
