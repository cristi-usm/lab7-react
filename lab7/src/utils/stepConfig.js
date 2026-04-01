export function getStepFields(step) {
  switch (step) {
    case 0:
      return ["fullName", "email", "birthDate", "travelers"];
    case 1:
      return ["country", "tripType", "budget", "startDate", "endDate"];
    case 2:
      return ["extras", "notes", "agreeTerms"];
    case 3:
      return [];
    default:
      return [];
  }
}