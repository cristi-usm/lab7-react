export const initialState = {
  step: 0,
  echipa: {
    nume: '',
    tara: '',
    culoare: '#FF6600',
    descriere: '',
    dataInregistrare: '',
  },
  jucatori: [
    { id: 1, nickname: '', rol: '', varsta: '' },
    { id: 2, nickname: '', rol: '', varsta: '' },
    { id: 3, nickname: '', rol: '', varsta: '' },
    { id: 4, nickname: '', rol: '', varsta: '' },
    { id: 5, nickname: '', rol: '', varsta: '' },
  ],
  turneu: {
    format: '',
    harti: [],
    zile: [],
  },
  errors: {},
  touched: {},
  submitted: false,
};

// --- FUNCTII HELPER PENTRU VALIDARE ---

function validateStep(state, step) {
  const errors = {};

  if (step === 0) {
    if (!state.echipa.nume.trim()) errors['echipa.nume'] = 'Numele echipei este obligatoriu';
    else if (state.echipa.nume.trim().length < 3) errors['echipa.nume'] = 'Minim 3 caractere';
    
    if (!state.echipa.tara) errors['echipa.tara'] = 'Selectează o țară';
    if (!state.echipa.dataInregistrare) errors['echipa.dataInregistrare'] = 'Data este obligatorie';
    
    if (!state.echipa.descriere.trim()) errors['echipa.descriere'] = 'Descrierea este obligatorie';
    else if (state.echipa.descriere.trim().length < 10) errors['echipa.descriere'] = 'Minim 10 caractere';
  }

  if (step === 1) {
    state.jucatori.forEach((j, i) => {
      if (!j.nickname.trim()) errors[`jucatori.${i}.nickname`] = 'Nickname obligatoriu';
      else if (j.nickname.trim().length < 2) errors[`jucatori.${i}.nickname`] = 'Minim 2 caractere';
      
      if (!j.rol) errors[`jucatori.${i}.rol`] = 'Selectează un rol';
      
      if (!j.varsta) errors[`jucatori.${i}.varsta`] = 'Vârsta este obligatorie';
      else if (j.varsta < 14 || j.varsta > 99) errors[`jucatori.${i}.varsta`] = 'Vârsta între 14-99';
    });

    const roluri = state.jucatori.map((j) => j.rol).filter(Boolean);
    const unique = new Set(roluri);
    if (roluri.length === 5 && unique.size < 3) {
      errors['jucatori.roluri'] = 'Echipa trebuie să aibă cel puțin 3 roluri diferite';
    }
  }

  if (step === 2) {
    if (!state.turneu.format) errors['turneu.format'] = 'Selectează un format';
    if (state.turneu.harti.length < 2) errors['turneu.harti'] = 'Selectează cel puțin 2 hărți';
    if (state.turneu.zile.length === 0) errors['turneu.zile'] = 'Selectează cel puțin o zi';
  }

  return errors;
}

function getTouchedForStep(state, step) {
  const touched = { ...state.touched };
  if (step === 0) {
    ['echipa.nume', 'echipa.tara', 'echipa.dataInregistrare', 'echipa.descriere'].forEach(k => touched[k] = true);
  }
  if (step === 1) {
    state.jucatori.forEach((_, i) => {
      [`jucatori.${i}.nickname`, `jucatori.${i}.rol`, `jucatori.${i}.varsta`].forEach(k => touched[k] = true);
    });
    touched['jucatori.roluri'] = true;
  }
  if (step === 2) {
    ['turneu.format', 'turneu.harti', 'turneu.zile'].forEach(k => touched[k] = true);
  }
  return touched;
}

function getUpdatedErrors(currentErrors, newState, step, prefix) {
  const filteredErrors = Object.keys(currentErrors).reduce((acc, key) => {
    if (!key.startsWith(prefix)) {
      acc[key] = currentErrors[key];
    }
    return acc;
  }, {});

  const newStepErrors = validateStep(newState, step);

  return { ...filteredErrors, ...newStepErrors };
}


export function reducer(state, action) {
  switch (action.type) {
    case 'SET_ECHIPA': {
      const newState = { 
        ...state, 
        echipa: { ...state.echipa, [action.camp]: action.valoare } 
      };
      return { 
        ...newState, 
        errors: getUpdatedErrors(state.errors, newState, 0, 'echipa.') 
      };
    }

    case 'SET_JUCATOR': {
      const jucatori = state.jucatori.map((j) =>
        j.id === action.id ? { ...j, [action.camp]: action.valoare } : j
      );
      const newState = { ...state, jucatori };
      return { 
        ...newState, 
        errors: getUpdatedErrors(state.errors, newState, 1, 'jucatori') 
      };
    }

    case 'SET_TURNEU_CAMP': {
      const newState = { 
        ...state, 
        turneu: { ...state.turneu, [action.camp]: action.valoare } 
      };
      return { 
        ...newState, 
        errors: getUpdatedErrors(state.errors, newState, 2, 'turneu.') 
      };
    }

    case 'TOGGLE_HARTA': {
      const harti = state.turneu.harti.includes(action.harta)
        ? state.turneu.harti.filter((h) => h !== action.harta)
        : [...state.turneu.harti, action.harta];
      const newState = { ...state, turneu: { ...state.turneu, harti } };
      return { 
        ...newState, 
        errors: getUpdatedErrors(state.errors, newState, 2, 'turneu.') 
      };
    }

    case 'TOGGLE_ZI': {
      const zile = state.turneu.zile.includes(action.zi)
        ? state.turneu.zile.filter((z) => z !== action.zi)
        : [...state.turneu.zile, action.zi];
      const newState = { ...state, turneu: { ...state.turneu, zile } };
      return { 
        ...newState, 
        errors: getUpdatedErrors(state.errors, newState, 2, 'turneu.') 
      };
    }

    case 'TOUCH_FIELD': {
      return { ...state, touched: { ...state.touched, [action.camp]: true } };
    }
case 'VALIDATE_STEP': {
  const touched = getTouchedForStep(state, action.step);

  const stepErrors = validateStep(state, action.step); 

  const currentPrefix = action.step === 0 ? 'echipa.' : action.step === 1 ? 'jucatori' : 'turneu.';
  const cleanedErrors = Object.keys(state.errors).reduce((acc, key) => {
    if (!key.startsWith(currentPrefix)) acc[key] = state.errors[key];
    return acc;
  }, {});

  return { 
    ...state, 
    touched, 
    errors: { ...cleanedErrors, ...stepErrors } // Folosirea lui stepErrors
  };
    }

    case 'SET_STEP': {
      return { ...state, step: action.step };
    }

    case 'SUBMIT': {
      return { ...state, submitted: true };
    }

    case 'RESET': {
      return { ...initialState };
    }

    default:
      return state;
  }
}

export { validateStep };
