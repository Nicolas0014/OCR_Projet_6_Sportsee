import { useState } from "react";
import GraphCard from "../GraphCard";
import HeartRateChart from "./HeartRateChart";
import { rawDailyRuns, buildBpmData } from "../../data/mockRuns";
import { getMondayOfWeek } from "../../utils/dateHelpers";
import { formatWeekLabel } from "../../utils/formatHelpers";

const weeks = Array.from(
  new Set(rawDailyRuns.map((r) => getMondayOfWeek(r.date))),
).sort();

/**
 * HeartRateSection – sélection de semaine + graphe BPM (Min / Max / Moy).
 */
export default function HeartRateSection() {
  const [weekIdx, setWeekIdx] = useState(weeks.length - 1);

  const data = buildBpmData(weeks[weekIdx]);

  const valid = data.filter((d) => d.average !== null);
  const avgBpm = valid.length
    ? Math.round(valid.reduce((s, d) => s + d.average, 0) / valid.length)
    : 0;

  return (
    <GraphCard
      info={`${avgBpm} BPM`}
      color="secondary"
      description="Fréquence cardiaque moyenne"
      periodSelectorProps={{
        label: formatWeekLabel(weeks[weekIdx]),
        onPrev: () => setWeekIdx((i) => i - 1),
        onNext: () => setWeekIdx((i) => i + 1),
        canGoPrev: weekIdx > 0,
        canGoNext: weekIdx < weeks.length - 1,
      }}
    >
      <HeartRateChart data={data} />
    </GraphCard>
  );
}
