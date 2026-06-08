/** dateStr: "YYYY-MM-DD" */

function toISODateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** 0 = Lundi … 6 = Dimanche */
export function getDayOfWeek(dateStr) {
  const d = new Date(dateStr);
  return (d.getDay() + 6) % 7;
}

/** Retourne la date ISO (YYYY-MM-DD) du lundi de la semaine contenant dateStr */
export function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - getDayOfWeek(dateStr));
  return d.toISOString().slice(0, 10);
}

/** "YYYY-MM" */
export function getMonthKey(dateStr) {
  return dateStr.slice(0, 7);
}

/** Numéro de semaine ISO */
export function getISOWeekNumber(dateStr) {
  const d = new Date(dateStr);
  const dayNum = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - dayNum);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/** Retourne les bornes (inclusives) du mois de dateInput, format ISO YYYY-MM-DD */
export function getMonthBounds(dateInput) {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  return {
    monthKey: `${year}-${String(monthIndex + 1).padStart(2, "0")}`,
    startDate: toISODateLocal(firstDay),
    endDate: toISODateLocal(lastDay),
  };
}

/** Retourne les bornes (inclusives) de la semaine (lundi->dimanche), format ISO YYYY-MM-DD */
export function getWeekBounds(dateInput) {
  const date = new Date(dateInput);
  const day = (date.getDay() + 6) % 7;
  const monday = new Date(date);
  monday.setDate(date.getDate() - day);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    startWeek: toISODateLocal(monday),
    endWeek: toISODateLocal(sunday),
  };
}
