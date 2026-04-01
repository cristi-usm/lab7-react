export function valideazaPas(pas, valori) {
  const errors = {};

  if (pas === 1) {
    if (!valori.nume) errors.nume = "Obligatoriu";
    if (!valori.descriere || valori.descriere.length < 20)
      errors.descriere = "Minim 20 caractere";
    if (!valori.regiune) errors.regiune = "Selecteaza";
  }

  if (pas === 2) {
    if (!valori.monstru) errors.monstru = "Alege monstru";
    if (valori.abilitati.length < 2)
      errors.abilitati = "Minim 2 abilitati";
  }

  if (pas === 3) {
    if (valori.potiuni.length < 1)
      errors.potiuni = "Minim o potiune";
    if (valori.semne.length < 1)
      errors.semne = "Minim un semn";
  }

  if (pas === 4) {
    if (!valori.recompensa) errors.recompensa = "Introdu suma";
  }

  return errors;
}