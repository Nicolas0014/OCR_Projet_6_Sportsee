import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

export default function Dashboard() {
  const weeklyRunsDatas = [
    {
      date: "2025-01-04",
      distance: 5.8,
      duration: 38,
      heartRate: { min: 140, max: 178, average: 163 },
      caloriesBurned: 422,
    },
    {
      date: "2025-01-05",
      distance: 3.2,
      duration: 20,
      heartRate: { min: 148, max: 184, average: 171 },
      caloriesBurned: 248,
    },
    {
      date: "2025-01-08",
      distance: 6.4,
      duration: 42,
      heartRate: { min: 140, max: 176, average: 163 },
      caloriesBurned: 468,
    },
    {
      date: "2025-01-10",
      distance: 7.5,
      duration: 50,
      heartRate: { min: 138, max: 178, average: 162 },
      caloriesBurned: 532,
    },
  ];

  const dailyRunsDatas = [
    {
      date: "2025-01-04",
      distance: 5.8,
      duration: 38,
      heartRate: { min: 140, max: 178, average: 163 },
      caloriesBurned: 422,
    },
    {
      date: "2025-01-05",
      distance: 3.2,
      duration: 20,
      heartRate: { min: 148, max: 184, average: 171 },
      caloriesBurned: 248,
    },
    {
      date: "2025-01-08",
      distance: 6.4,
      duration: 42,
      heartRate: { min: 140, max: 176, average: 163 },
      caloriesBurned: 468,
    },
    {
      date: "2025-01-10",
      distance: 7.5,
      duration: 50,
      heartRate: { min: 138, max: 178, average: 162 },
      caloriesBurned: 532,
    },
  ];

  // Calcul de la fréquence cardiaque moyenne
  const averageHeartRate =
    dailyRunsDatas
      .map((run) => run.heartRate.average)
      .reduce((a, b) => a + b, 0) / dailyRunsDatas.length;

  return (
    <div id="dashboard">
      <div className="graphs-container">
        {/* Menu header du graphique avec résumé et sélection des jours de la semaine */}
        <div className="graph-header">
          <span>{averageHeartRate} BPM</span>
          <div>SELECTION</div>
        </div>
        <ComposedChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={dailyRunsDatas}
          margin={{
            top: 20,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band" />
          <YAxis width="auto" niceTicks="snap125" />
          <Tooltip />
          <Legend />
          <Bar dataKey="heartRate.min" barSize={20} fill="#413ea0" />
          <Bar dataKey="heartRate.max" barSize={20} fill="#ff7300" />
          <Line type="monotone" dataKey="heartRate.average" stroke="#82ca9d" />
        </ComposedChart>
        <ComposedChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={weeklyRunsDatas}
          margin={{
            top: 20,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" scale="band" />
          <YAxis width="auto" niceTicks="snap125" />
          <Tooltip />
          <Legend />
          <Bar dataKey="heartRate.min" barSize={20} fill="#413ea0" />
          <Bar dataKey="heartRate.max" barSize={20} fill="#ff7300" />
          <Line type="monotone" dataKey="heartRate.average" stroke="#82ca9d" />
        </ComposedChart>
      </div>
    </div>
  );
}
