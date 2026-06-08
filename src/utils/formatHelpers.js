const MONTHS_SHORT = [
  "Jan.",
  "Fév.",
  "Mars",
  "Avr.",
  "Mai",
  "Juin",
  "Juil.",
  "Août",
  "Sep.",
  "Oct.",
  "Nov.",
  "Déc.",
];

const MONTHS_FULL = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/** "28 mai - 04 juin" à partir d'une date de semaine */
export function formatWeekLabel(weekInput) {
  const baseDate = new Date(weekInput);

  if (Number.isNaN(baseDate.getTime())) {
    return "Semaine invalide";
  }

  const day = (baseDate.getDay() + 6) % 7;
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - day);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDay = (date) =>
    `${String(date.getDate()).padStart(2, "0")} ${MONTHS_FULL[date.getMonth()].toLowerCase()}`;

  return `${formatDay(monday)} - ${formatDay(sunday)}`;
}

/** "Janvier 2025" à partir de "2025-01-10" */
export function formatMonthLabel(monthKey) {
  if (monthKey instanceof Date) {
    const monthIndex = monthKey.getMonth();
    const year = monthKey.getFullYear();
    return `${MONTHS_FULL[monthIndex]} ${year}`;
  }

  if (typeof monthKey === "string") {
    const [year, month] = monthKey.split("-");
    const monthIndex = parseInt(month, 10) - 1;

    if (!Number.isNaN(monthIndex) && monthIndex >= 0 && monthIndex <= 11) {
      return `${MONTHS_FULL[monthIndex]} ${year}`;
    }
  }

  return "Mois invalide";
}
