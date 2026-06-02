import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GraphCard from "../GraphCard";
import { formatMonthLabel } from "../../utils/formatHelpers";
import { getISOWeekNumber, getMonthKey } from "../../utils/dateHelpers";
import useUserProfile from "../../hooks/useUserProfile";

export default function WeeklyDistanceSection() {
  const { getRunsByDateRange } = useUserProfile();
  const [runs, setRuns] = useState([]);
  const [monthOffset, setMonthOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRuns() {
      setIsLoading(true);
      const rawRuns = await getRunsByDateRange("2000-01-01", "2100-12-31");

      setRuns(rawRuns);
      setIsLoading(false);
    }

    loadRuns();
  }, [getRunsByDateRange]);

  const selectedMonth = useMemo(() => {
    // Fixer à Janvier 2025 dans le cadre du projet
    const date = new Date(2025, 0, 1);
    date.setMonth(date.getMonth() + monthOffset);

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }, [monthOffset]);

  const runsInSelectedMonth = useMemo(() => {
    return runs.filter((run) => getMonthKey(run.date) === selectedMonth);
  }, [runs, selectedMonth]);

  const chartData = useMemo(() => {
    const groupedByWeek = runsInSelectedMonth.reduce((acc, run) => {
      const weekNumber = getISOWeekNumber(run.date);

      if (!acc[weekNumber]) {
        acc[weekNumber] = { weekNumber, distanceSum: 0, runCount: 0 };
      }

      acc[weekNumber].distanceSum += run.distance;
      acc[weekNumber].runCount += 1;
      return acc;
    }, {});

    return Object.values(groupedByWeek)
      .sort((a, b) => a.weekNumber - b.weekNumber)
      .map((week) => ({
        week: `S${week.weekNumber}`,
        avgDistance: Number((week.distanceSum / week.runCount).toFixed(1)),
      }));
  }, [runsInSelectedMonth]);

  const totalDistance = useMemo(() => {
    const monthTotal = runsInSelectedMonth.reduce(
      (sum, run) => sum + run.distance,
      0,
    );

    return monthTotal.toFixed(1);
  }, [runsInSelectedMonth]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <GraphCard
      info={`${totalDistance} km`}
      color="primary"
      description="Total des kilomètres du mois"
      periodSelectorProps={{
        label: formatMonthLabel(selectedMonth),
        onPrev: () => setMonthOffset((i) => i - 1),
        onNext: () => setMonthOffset((i) => i + 1),
        canGoPrev: true,
        canGoNext: true,
      }}
    >
      <ResponsiveContainer width="100%" aspect={1.6}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 16, bottom: 0, left: -16 }}
        >
          <CartesianGrid stroke="var(--color-gray-light)" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
            axisLine={false}
            tickLine={false}
            unit=" km"
            domain={[0, "auto"]}
          />
          <Tooltip
            formatter={(val) => [
              `${Number(val).toFixed(1)} km`,
              "Distance moy.",
            ]}
            labelFormatter={(label) =>
              `Semaine ${String(label).replace("S", "")}`
            }
          />
          <Legend
            wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
            formatter={(value) => (
              <span style={{ color: "var(--color-gray-dark)" }}>{value}</span>
            )}
          />
          <Bar
            dataKey="avgDistance"
            name="Distance moy. (km)"
            barSize={28}
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </GraphCard>
  );
}
