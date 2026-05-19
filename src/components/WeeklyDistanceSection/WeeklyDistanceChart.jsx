import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/**
 * WeeklyDistanceChart – distance moyenne (km) par semaine ISO.
 *
 * @param {Array} data - Tableau d'entrées { week: "S3", avgDistance: 5.8 }
 */
export default function WeeklyDistanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" aspect={1.6}>
      <BarChart
        data={data}
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
          formatter={(val) => [`${val.toFixed(1)} km`, "Distance moy."]}
          labelFormatter={(v) => `Semaine ${v}`}
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
  );
}
