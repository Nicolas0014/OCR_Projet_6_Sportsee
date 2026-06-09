import { useEffect, useState } from "react";
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
import { getWeekBounds } from "../../utils/dateHelpers";
import useRuns from "../../hooks/useRuns";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function HeartRateSection() {
  const [currentWeekSelected, setCurrentWeekSelected] = useState(new Date());
  const [averageBpm, setAverageBpm] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(() =>
    getWeekBounds(new Date()),
  );
  const [chartData, setChartData] = useState([]);

  const {
    data: runsData = [],
    isLoading,
    error,
  } = useRuns(selectedPeriod.startWeek, selectedPeriod.endWeek);

  useEffect(() => {
    setSelectedPeriod(getWeekBounds(currentWeekSelected));
  }, [currentWeekSelected]);

  useEffect(() => {
    const dataByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

    (runsData || []).forEach((run) => {
      const date = new Date(run.date);
      const dayIndex = (date.getDay() + 6) % 7;
      dataByDay[dayIndex].push(run);
    });

    const nextChartData = DAY_LABELS.map((label, day) => {
      const dayRuns = dataByDay[day];

      if (!dayRuns.length) {
        return { day, label, minBpm: null, maxBpm: null, moyBpm: null };
      }

      const minBpm = Math.min(...dayRuns.map((run) => run.heartRate.min));
      const maxBpm = Math.max(...dayRuns.map((run) => run.heartRate.max));
      const moyBpm =
        dayRuns.reduce((sum, run) => sum + run.heartRate.average, 0) /
        dayRuns.length;

      return {
        day,
        label,
        minBpm,
        maxBpm,
        moyBpm: Number(moyBpm.toFixed(1)),
      };
    });

    setChartData(nextChartData);
  }, [runsData]);

  useEffect(() => {
    const valid = chartData.filter((item) => item.moyBpm !== null);
    if (valid.length === 0) {
      setAverageBpm(0);
      return;
    }

    const total = valid.reduce((sum, item) => sum + item.moyBpm, 0);
    setAverageBpm(Number((total / valid.length).toFixed(1)));
  }, [chartData]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <GraphCard
      info={`${averageBpm} BPM en moyenne`}
      color="secondary"
      description="Fréquence cardiaque moyenne"
      periodSelectorProps={{
        label: formatWeekLabel(currentWeekSelected),
        onPrev: () => {
          setCurrentWeekSelected((prev) => {
            const next = new Date(prev);
            next.setDate(next.getDate() - 7);
            return next;
          });
        },
        onNext: () => {
          setCurrentWeekSelected((prev) => {
            const next = new Date(prev);
            next.setDate(next.getDate() + 7);
            return next;
          });
        },
        canGoPrev: true,
        canGoNext: true,
      }}
    >
      {!error && runsData.length === 0 && (
        <p>Aucune donnée disponible pour cette semaine.</p>
      )}
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
            tickFormatter={(value) => `${value} bpm`}
            domain={[120, 180]}
            width={52}
            tickMargin={8}
            allowDecimals={false}
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
            dataKey="minBpm"
            name="Min BPM"
            barSize={14}
            fill="var(--color-secondary-light)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="maxBpm"
            name="Max BPM"
            barSize={14}
            fill="var(--color-secondary)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="moyBpm"
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
