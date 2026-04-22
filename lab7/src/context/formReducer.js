export const initialState = {
    currentStep: 0,
    submitted: false,
    fields: {
        // Step 1 - Astronaut Profile
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        role: '',
        bio: '',

        // Step 2 - Mission Config
        missionName: '',
        destination: '',
        launchDate: '',
        duration: '',
        budget: 50,

        // Step 3 - Spacecraft & Equipment
        spacecraft: '',
        equipment: [],
        priorities: [],

        // Step 4 - Review
    },
    errors: {},
    touched: {},
};

function validateStep(fields, step) {
    const errors = {};

    if (step === 0) {
        if (!fields.firstName.trim()) errors.firstName = 'First name is required';
        else if (fields.firstName.trim().length < 2) errors.firstName = 'Minimum 2 characters';

        if (!fields.lastName.trim()) errors.lastName = 'Last name is required';
        else if (fields.lastName.trim().length < 2) errors.lastName = 'Minimum 2 characters';

        if (!fields.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Invalid email format';

        if (!fields.age) errors.age = 'Age is required';
        else if (Number(fields.age) < 18 || Number(fields.age) > 65) errors.age = 'Age must be between 18 and 65';

        if (!fields.role) errors.role = 'Select your mission role';

        if (!fields.bio.trim()) errors.bio = 'Bio is required';
        else if (fields.bio.trim().length < 20) errors.bio = 'Bio must be at least 20 characters';
    }

    if (step === 1) {
        if (!fields.missionName.trim()) errors.missionName = 'Mission name is required';
        else if (fields.missionName.trim().length < 5) errors.missionName = 'Minimum 5 characters';

        if (!fields.destination) errors.destination = 'Select a destination';

        if (!fields.launchDate) errors.launchDate = 'Launch date is required';
        else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const launch = new Date(fields.launchDate);
            if (launch <= today) errors.launchDate = 'Launch date must be in the future';
        }

        if (!fields.duration || Number(fields.duration) < 1) errors.duration = 'Mission duration must be at least 1 day';
    }

    if (step === 2) {
        if (!fields.spacecraft) errors.spacecraft = 'Select a spacecraft';
        if (fields.equipment.length < 2) errors.equipment = 'Select at least 2 equipment items';
        if (fields.priorities.length < 1) errors.priorities = 'Select at least 1 mission priority';
    }

    return errors;
}

export function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                fields: { ...state.fields, [action.field]: action.value },
                errors: {
                    ...state.errors,
                    [action.field]: undefined,
                },
            };

        case 'TOUCH_FIELD':
            return {
                ...state,
                touched: { ...state.touched, [action.field]: true },
            };

        case 'VALIDATE_STEP': {
            const errors = validateStep(state.fields, state.currentStep);
            const stepFields = getStepFields(state.currentStep);
            const touched = { ...state.touched };
            stepFields.forEach(f => { touched[f] = true; });
            return { ...state, errors, touched };
        }

        case 'SET_STEP': {
            if (action.step > state.currentStep) {
                const errors = validateStep(state.fields, state.currentStep);
                if (Object.keys(errors).length > 0) {
                    const stepFields = getStepFields(state.currentStep);
                    const touched = { ...state.touched };
                    stepFields.forEach(f => { touched[f] = true; });
                    return { ...state, errors, touched };
                }
            }
            return { ...state, currentStep: action.step, errors: {} };
        }

        case 'TOGGLE_EQUIPMENT': {
            const current = state.fields.equipment;
            const exists = current.includes(action.value);
            const updated = exists
                ? current.filter(v => v !== action.value)
                : [...current, action.value];
            return {
                ...state,
                fields: { ...state.fields, equipment: updated },
                errors: { ...state.errors, equipment: undefined },
            };
        }

        case 'TOGGLE_PRIORITY': {
            const current = state.fields.priorities;
            const exists = current.includes(action.value);
            const updated = exists
                ? current.filter(v => v !== action.value)
                : [...current, action.value];
            return {
                ...state,
                fields: { ...state.fields, priorities: updated },
                errors: { ...state.errors, priorities: undefined },
            };
        }

        case 'SUBMIT':
            return { ...state, submitted: true };

        case 'RESET':
            return { ...initialState };

        default:
            return state;
    }
}

function getStepFields(step) {
    const stepFieldsMap = {
        0: ['firstName', 'lastName', 'email', 'age', 'role', 'bio'],
        1: ['missionName', 'destination', 'launchDate', 'duration'],
        2: ['spacecraft', 'equipment', 'priorities'],
    };
    return stepFieldsMap[step] || [];
}
