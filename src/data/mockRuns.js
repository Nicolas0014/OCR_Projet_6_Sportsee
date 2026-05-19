import rawDailyRuns from "../../public/data/mock_dailyrundatas.json";
import {
  getDayOfWeek,
  getISOWeekNumber,
  getMonthKey,
} from "../utils/dateHelpers";

export { rawDailyRuns };

/**
 * Construit un tableau de 7 entrées (Lun → Dim) pour le graphe BPM.
 * Les jours sans course ont leurs valeurs à null.
 */
export function buildBpmData(mondayStr) {
  const monday = new Date(mondayStr);
  const sunday = new Date(mondayStr);
  sunday.setDate(sunday.getDate() + 6);

  const runsOfTheWeek = rawDailyRuns.filter((r) => {
    const runDate = new Date(r.date);
    return runDate >= monday && runDate <= sunday;
  });

  const days = [0, 1, 2, 3, 4, 5, 6]; // Lun → Dim
  return days.map((dayIndex) => {
    const run = runsOfTheWeek.find((r) => getDayOfWeek(r.date) === dayIndex);

    if (!run) {
      return { day: dayIndex, min: null, max: null, average: null };
    }

    return {
      day: dayIndex,
      min: run.heartRate.min,
      max: run.heartRate.max,
      average: run.heartRate.average,
    };
  });
}

/**
 * Calcule la distance moyenne (km) par semaine ISO pour un mois donné (ex: "2025-01").
 */
export function buildWeeklyDistanceData(monthKey) {
  const inMonth = rawDailyRuns.filter((r) => getMonthKey(r.date) === monthKey);
  const byWeek = {};
  inMonth.forEach((r) => {
    const wk = getISOWeekNumber(r.date);
    if (!byWeek[wk]) byWeek[wk] = [];
    byWeek[wk].push(r.distance);
  });
  return Object.entries(byWeek)
    .sort(([a], [b]) => +a - +b)
    .map(([wk, distances]) => ({
      week: `S${wk}`,
      avgDistance: distances.reduce((s, v) => s + v, 0) / distances.length,
    }));
}
