import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GraphCard from "../GraphCard";
import { formatWeekLabel } from "../../utils/formatHelpers";
import useUserProfile from "../../hooks/useUserProfile";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function HeartRateSection() {
  const { getRunsByDateRange } = useUserProfile();
  const [weekRuns, setWeekRuns] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const weekRange = useMemo(() => {
    const today = new Date();
    const day = (today.getDay() + 6) % 7;
    const monday = new Date(today);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(today.getDate() - day + weekOffset * 7);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return {
      startWeek: monday.toISOString().slice(0, 10),
      endWeek: sunday.toISOString().slice(0, 10),
    };
  }, [weekOffset]);

  useEffect(() => {
    async function loadWeekRuns() {
      setIsLoading(true);
      const runs = await getRunsByDateRange(
        weekRange.startWeek,
        weekRange.endWeek,
      );
      setWeekRuns(runs || []);
      setIsLoading(false);
    }

    loadWeekRuns();
  }, [getRunsByDateRange, weekRange]);

  const chartData = useMemo(() => {
    const dataByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

    weekRuns.forEach((run) => {
      const date = new Date(run.date);
      const dayIndex = (date.getDay() + 6) % 7;
      dataByDay[dayIndex].push(run);
    });

    return DAY_LABELS.map((label, day) => {
      const dayRuns = dataByDay[day];

      if (!dayRuns.length) {
        return { day, label, min: null, max: null, average: null };
      }

      const min = Math.min(...dayRuns.map((run) => run.heartRate.min));
      const max = Math.max(...dayRuns.map((run) => run.heartRate.max));
      const average =
        dayRuns.reduce((sum, run) => sum + run.heartRate.average, 0) /
        dayRuns.length;

      return {
        day,
        label,
        min,
        max,
        average: Number(average.toFixed(1)),
      };
    });
  }, [weekRuns]);

  const avgBpm = useMemo(() => {
    const valid = chartData.filter((d) => d.average !== null);
    if (!valid.length) return 0;
    return Math.round(
      valid.reduce((sum, d) => sum + d.average, 0) / valid.length,
    );
  }, [chartData]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <GraphCard
      info={`${avgBpm} BPM`}
      color="secondary"
      description="Frequence cardiaque moyenne"
      periodSelectorProps={{
        label: formatWeekLabel(weekRange.startWeek),
        onPrev: () => setWeekOffset((i) => i - 1),
        onNext: () => setWeekOffset((i) => i + 1),
        canGoPrev: true,
        canGoNext: true,
      }}
    >
      <ResponsiveContainer width="100%" aspect={1.6}>
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 16, bottom: 0, left: -16 }}
        >
          <CartesianGrid stroke="var(--color-gray-light)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
            axisLine={false}
            tickLine={false}
            unit=" bpm"
            domain={["auto", "auto"]}
          />
          <Tooltip
            formatter={(val, name) => [val !== null ? `${val} bpm` : "-", name]}
            labelFormatter={(label) => `Jour ${label}`}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            formatter={(value) => (
              <span style={{ color: "var(--color-gray-dark)" }}>{value}</span>
            )}
          />
          <Bar
            dataKey="min"
            name="Min BPM"
            barSize={14}
            fill="var(--color-secondary-light)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="max"
            name="Max BPM"
            barSize={14}
            fill="var(--color-secondary)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="average"
            name="Moy BPM"
            stroke="var(--color-light-blue)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--color-primary)" }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </GraphCard>
  );
}
