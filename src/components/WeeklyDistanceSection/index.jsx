import { useState, useEffect } from "react";
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
import { getISOWeekNumber, getMonthBounds } from "../../utils/dateHelpers";
import useRuns from "../../hooks/useRuns";

export default function WeeklyDistanceSection() {
  const [currentMonthSelected, setCurrentMonthSelected] = useState(
    new Date(2025, 0, 1),
  );
  const [averageDistance, setAverageDistance] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: null,
    endDate: null,
  });
  const [weeklyRuns, setWeeklyRuns] = useState([]);
  const [chartData, setChartData] = useState([]);

  const {
    data: runsData,
    isLoading,
    error,
  } = useRuns(selectedPeriod.startDate, selectedPeriod.endDate);

  useEffect(() => {
    const { startDate, endDate } = getMonthBounds(currentMonthSelected);
    setSelectedPeriod({ startDate, endDate });
  }, [currentMonthSelected]);

  useEffect(() => {
    // Mettre à jour les calculs d'affichage dès que les données de runs sont chargées
    const totalDistance = runsData.reduce((sum, run) => sum + run.distance, 0);

    const averageDistance =
      runsData.length > 0 ? totalDistance / runsData.length : 0;
    setAverageDistance(averageDistance.toFixed(1));
  }, [runsData]);

  useEffect(() => {
    // Regroupe les runs par semaine et stocke le resultat en state.
    const groupedByWeek = (runsData || []).reduce((acc, run) => {
      const weekNumber = getISOWeekNumber(run.date);

      if (!acc[weekNumber]) {
        acc[weekNumber] = {
          weekNumber,
          runs: [],
          distanceSum: 0,
          runCount: 0,
        };
      }

      acc[weekNumber].runs.push(run);
      acc[weekNumber].distanceSum += run.distance;
      acc[weekNumber].runCount += 1;
      return acc;
    }, {});

    const nextWeeklyRuns = Object.values(groupedByWeek).sort(
      (a, b) => a.weekNumber - b.weekNumber,
    );

    setWeeklyRuns(nextWeeklyRuns);
  }, [runsData]);

  useEffect(() => {
    // Calcule le format final attendu par recharts.
    const nextChartData = weeklyRuns.map((week) => ({
      week: `S${week.weekNumber}`,
      avgDistance: Number((week.distanceSum / week.runCount).toFixed(1)),
    }));

    setChartData(nextChartData);
  }, [weeklyRuns]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <GraphCard
      info={`${averageDistance} km en moyenne`}
      color="primary"
      description="Total des kilomètres du mois"
      periodSelectorProps={{
        label: formatMonthLabel(currentMonthSelected),
        onPrev: () => {
          setCurrentMonthSelected((prev) => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() - 1);
            return next;
          });
        },
        onNext: () => {
          setCurrentMonthSelected((prev) => {
            const next = new Date(prev);
            next.setMonth(next.getMonth() + 1);
            return next;
          });
        },
      }}
    >
      {!error && runsData.length === 0 && (
        <p>Aucune donnée disponible pour ce mois.</p>
      )}
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
