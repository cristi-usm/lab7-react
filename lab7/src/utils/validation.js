export function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = "Full name must have at least 3 characters";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Email format is invalid";
  }

  if (!values.birthDate) {
    errors.birthDate = "Birth date is required";
  }

  if (!values.country) {
    errors.country = "Please select a country";
  }

  if (!values.tripType) {
    errors.tripType = "Please choose a trip type";
  }

  if (!values.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!values.endDate) {
    errors.endDate = "End date is required";
  }

  if (values.startDate && values.endDate) {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);

    if (end <= start) {
      errors.endDate = "End date must be after start date";
    }
  }

  if (values.budget < 300) {
    errors.budget = "Budget must be at least 300";
  }

  if (values.extras.length < 2) {
    errors.extras = "Select at least 2 extras";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "You must accept the terms";
  }

  return errors;
}