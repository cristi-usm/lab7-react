export function validateStep(fields, step) {
  const errors = {};

  if (step === 0) {
    if (!fields.name.trim()) errors.name = "Numele este obligatoriu.";
    else if (fields.name.trim().length < 3) errors.name = "Minim 3 caractere.";

    if (!fields.email.trim()) errors.email = "Email-ul este obligatoriu.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errors.email = "Email invalid.";

    if (!fields.phone.trim()) errors.phone = "Telefonul este obligatoriu.";
    else if (!/^\+?[0-9]{9,13}$/.test(fields.phone))
      errors.phone = "Numar de telefon invalid.";

    if (!fields.age) errors.age = "Varsta este obligatorie.";
    else if (Number(fields.age) < 18)
      errors.age = "Trebuie sa ai minim 18 ani.";
  }

  if (step === 1) {
    if (!fields.tableType) errors.tableType = "Alege un tip de masa.";
    if (!fields.guests) errors.guests = "Numarul de persoane este obligatoriu.";
    else if (Number(fields.guests) < 1 || Number(fields.guests) > 20)
      errors.guests = "Intre 1 si 20 de persoane.";
    if (!fields.date) errors.date = "Data este obligatorie.";
    else {
      const chosen = new Date(fields.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) errors.date = "Data nu poate fi in trecut.";
    }
    if (!fields.time) errors.time = "Ora este obligatorie.";
  }

  if (step === 2) {
    if (fields.extras.length < 1) errors.extras = "Alege cel putin un extra.";
    if (fields.budget < 100) errors.budget = "Bugetul minim este de 100 MDL.";
  }

  return errors;
}

export const STEP_FIELDS = [
  ["name", "email", "phone", "age"],
  ["tableType", "guests", "date", "time"],
  ["extras", "budget"],
];
