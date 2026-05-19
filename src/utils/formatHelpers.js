const MONTHS_SHORT = [
  "Jan.", "Fév.", "Mars", "Avr.", "Mai", "Juin",
  "Juil.", "Août", "Sep.", "Oct.", "Nov.", "Déc.",
];

const MONTHS_FULL = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/** "4 Jan. – 10 Jan." à partir du lundi de la semaine */
export function formatWeekLabel(mondayStr) {
  const mon = new Date(mondayStr);
  const sun = new Date(mondayStr);
  sun.setDate(mon.getDate() + 6);
  return `${mon.getDate()} ${MONTHS_SHORT[mon.getMonth()]} – ${sun.getDate()} ${MONTHS_SHORT[sun.getMonth()]}`;
}

/** "Janvier 2025" à partir de "2025-01" */
export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-");
  return `${MONTHS_FULL[parseInt(month, 10) - 1]} ${year}`;
}
