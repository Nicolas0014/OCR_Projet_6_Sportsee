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
import { getMonthBounds } from "../../utils/dateHelpers";
import useRuns from "../../hooks/useRuns";

export default function WeeklyDistanceSection() {
  const [currentMonthSelected, setCurrentMonthSelected] = useState(new Date());
  const [averageDistance, setAverageDistance] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: null,
    endDate: null,
  });
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
    const totalDistance = (runsData || []).reduce(
      (sum, run) => sum + run.distance,
      0,
    );

    const averageDistance =
      (runsData || []).length > 0 ? totalDistance / runsData.length : 0;
    setAverageDistance(averageDistance.toFixed(1));
  }, [runsData]);

  useEffect(() => {
    // Construit S1..S4/S5 selon le mois sélectionné, puis injecte 0 km si semaine vide.
    const year = currentMonthSelected.getFullYear();
    const month = currentMonthSelected.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weekCount = Math.ceil(daysInMonth / 7);
    const monthNumber = String(month + 1).padStart(2, "0");

    const formatRangeLabel = (startDay, endDay) => {
      const paddedStartDay = String(startDay).padStart(2, "0");
      const paddedEndDay = String(endDay).padStart(2, "0");

      return `${paddedStartDay}/${monthNumber} - ${paddedEndDay}/${monthNumber}`;
    };

    const weeks = Array.from({ length: weekCount }, (_, index) => ({
      week: `S${index + 1}`,
      distanceSum: 0,
      runCount: 0,
      rangeLabel: formatRangeLabel(
        index * 7 + 1,
        Math.min(daysInMonth, index * 7 + 7),
      ),
    }));

    (runsData || []).forEach((run) => {
      const runDate = new Date(run.date);

      if (runDate.getFullYear() !== year || runDate.getMonth() !== month) {
        return;
      }

      const weekIndex = Math.min(
        weekCount - 1,
        Math.floor((runDate.getDate() - 1) / 7),
      );
      weeks[weekIndex].distanceSum += run.distance;
      weeks[weekIndex].runCount += 1;
    });

    const nextChartData = weeks.map((week) => ({
      week: week.week,
      avgDistance:
        week.runCount > 0
          ? Number((week.distanceSum / week.runCount).toFixed(1))
          : 0,
      rangeLabel: week.rangeLabel,
    }));

    setChartData(nextChartData);
  }, [currentMonthSelected, runsData]);

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
      {!error && (runsData || []).length === 0 && (
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
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.rangeLabel || ""
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
