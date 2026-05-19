import { useState } from "react";
import GraphCard from "../GraphCard";
import WeeklyDistanceChart from "./WeeklyDistanceChart";
import { rawDailyRuns, buildWeeklyDistanceData } from "../../data/mockRuns";
import { getMonthKey } from "../../utils/dateHelpers";
import { formatMonthLabel } from "../../utils/formatHelpers";

const months = Array.from(
  new Set(rawDailyRuns.map((r) => getMonthKey(r.date))),
).sort();

/**
 * WeeklyDistanceSection – sélection de mois + graphe distance moyenne par semaine.
 * Gère son propre état de navigation.
 */
export default function WeeklyDistanceSection() {
  const [monthIdx, setMonthIdx] = useState(0);

  const data = buildWeeklyDistanceData(months[monthIdx]);

  const totalDist = data.reduce((s, d) => s + d.avgDistance, 0).toFixed(1);

  return (
    <GraphCard
      info={`${totalDist} km`}
      color="primary"
      description="Total des kilomètres 4 dernières semaines"
      periodSelectorProps={{
        label: formatMonthLabel(months[monthIdx]),
        onPrev: () => setMonthIdx((i) => i - 1),
        onNext: () => setMonthIdx((i) => i + 1),
        canGoPrev: monthIdx > 0,
        canGoNext: monthIdx < months.length - 1,
      }}
    >
      <WeeklyDistanceChart data={data} />
    </GraphCard>
  );
}
