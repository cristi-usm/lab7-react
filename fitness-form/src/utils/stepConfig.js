import formOptions from '../data/formOptions.json'

export const STEP_LABELS = formOptions.stepLabels

export const STEP_FIELDS = {
  0: ['fullName', 'email', 'startDate'],
  1: ['roomType', 'budget', 'focusLevel', 'workMode'],
  2: ['equipment', 'colorTheme', 'notes'],
  3: [],
}

export const REQUIRED_FIELDS = [
  'fullName',
  'email',
  'startDate',
  'roomType',
  'budget',
  'workMode',
  'equipment',
  'colorTheme',
  'notes',
]
