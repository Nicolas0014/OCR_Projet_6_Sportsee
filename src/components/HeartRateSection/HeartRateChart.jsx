import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

/**
 * HeartRateChart – barres Min/Max BPM + courbe Moy BPM par jour de la semaine.
 *
 * @param {Array} data - Tableau de 7 entrées (une par jour, 0 = lundi).
 *   Chaque entrée : { day: number, min: number|null, max: number|null, average: number|null }
 */
export default function HeartRateChart({ data }) {
  return (
    <ResponsiveContainer width="100%" aspect={1.6}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 16, bottom: 0, left: -16 }}
      >
        <CartesianGrid stroke="var(--color-gray-light)" vertical={false} />
        <XAxis
          dataKey="day"
          tickFormatter={(v) => DAY_LABELS[v] ?? v}
          tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--color-gray-dark)" }}
          axisLine={false}
          tickLine={false}
          unit=" bpm"
          domain={[130, 190]}
        />
        <Tooltip
          formatter={(val, name) =>
            val !== null ? [`${val} bpm`, name] : ["—", name]
          }
          labelFormatter={(v) => DAY_LABELS[v] ?? v}
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
  );
}
