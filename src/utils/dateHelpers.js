/** dateStr: "YYYY-MM-DD" */

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
