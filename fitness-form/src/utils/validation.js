export function validateForm(formData) {
  const errors = {}

  if (!formData.fullName.trim()) {
    errors.fullName = 'Numele este obligatoriu.'
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = 'Numele trebuie sa aiba minim 3 caractere.'
  }

  if (!formData.email.trim()) {
    errors.email = 'Email-ul este obligatoriu.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email invalid.'
  }

  if (!formData.startDate) {
    errors.startDate = 'Alege data de start.'
  } else {
    const today = new Date().toISOString().split('T')[0]
    if (formData.startDate < today) {
      errors.startDate = 'Data de start trebuie sa fie azi sau in viitor.'
    }
  }

  if (!formData.roomType) {
    errors.roomType = 'Selecteaza tipul de spatiu.'
  }

  if (!formData.budget) {
    errors.budget = 'Bugetul este obligatoriu.'
  } else if (Number(formData.budget) < 300) {
    errors.budget = 'Bugetul minim este 300.'
  }

  if (!formData.workMode) {
    errors.workMode = 'Alege un mod de lucru.'
  }

  if (!formData.equipment || formData.equipment.length < 2) {
    errors.equipment = 'Selecteaza cel putin 2 elemente de echipament.'
  }

  if (!formData.colorTheme) {
    errors.colorTheme = 'Alege o tema de culoare.'
  }

  if (!formData.notes.trim()) {
    errors.notes = 'Adauga o scurta descriere.'
  } else if (formData.notes.trim().length < 10) {
    errors.notes = 'Descrierea trebuie sa aiba minim 10 caractere.'
  }

  return errors
}
