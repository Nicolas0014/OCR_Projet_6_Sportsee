import { useState, useEffect, useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import useUserProfile from "../../hooks/useUserProfile";
import useRuns from "../../hooks/useRuns";
import { getWeekBounds } from "../../utils/dateHelpers";
import "./WeeklyRecap.css";

const GOAL_CHART_COLORS = ["var(--color-primary)", "#aab2ff"];

function formatDateRange(startDate, endDate) {
  const start = new Date(startDate).toLocaleDateString("fr-FR");
  const end = new Date(endDate).toLocaleDateString("fr-FR");
  return `Du ${start} au ${end}`;
}

export default function WeeklyRecap() {
  const [selectedPeriod, setSelectedPeriod] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const today = new Date();
    const { startWeek, endWeek } = getWeekBounds(today);
    setSelectedPeriod({ startDate: startWeek, endDate: endWeek });
  }, []);

  const weekLabel = useMemo(
    () => formatDateRange(selectedPeriod.startDate, selectedPeriod.endDate),
    [selectedPeriod.endDate, selectedPeriod.startDate],
  );

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useUserProfile();
  console.log("user dans WeeklyRecap", user);
  const {
    data: runs = [],
    isLoading: isRunsLoading,
    error: runsError,
  } = useRuns(selectedPeriod.startDate, selectedPeriod.endDate);

  if (isUserLoading || isRunsLoading) {
    return <p>Chargement...</p>;
  }

  if (userError || runsError) {
    return (
      <p className="error">Erreur lors du chargement du recap hebdomadaire.</p>
    );
  }

  if (!user) {
    return <p>Aucune donnée utilisateur disponible.</p>;
  }

  const stats = {
    weeklyGoals: user.weeklyGoals || 0,
    completedRuns: runs.length,
    totalDistance: runs.reduce(
      (sum, run) => sum + (Number(run.distance) || 0),
      0,
    ),
    totalDuration: runs.reduce(
      (sum, run) => sum + (Number(run.duration) || 0),
      0,
    ),
    chartData: [
      { name: "réalisées", value: runs.length },
      {
        name: "restantes",
        value: Math.max(0, (user.weeklyGoals || 0) - runs.length),
      },
    ],
  };

  return (
    <section className="weekly-recap">
      <header className="weekly-recap__header">
        <h2>Cette semaine</h2>
        <p>{weekLabel}</p>
      </header>

      <div className="weekly-recap__content">
        <article className="weekly-recap__goal-card">
          <p className="weekly-recap__goal-title">
            x{stats.completedRuns}{" "}
            <span className="weekly-recap__goal-value">
              sur objectif de {stats.weeklyGoals}
            </span>
          </p>
          <p className="weekly-recap__goal-subtitle">
            Courses hebdomadaires réalisées
          </p>

          <div className="weekly-recap__chart-wrap">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={stats.chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={stats.remainingRuns > 0 ? 2 : 0}
                >
                  {stats.chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={GOAL_CHART_COLORS[index % GOAL_CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="weekly-recap__legend weekly-recap__legend--done">
              <span className="weekly-recap__dot weekly-recap__dot--done" />
              <span>{stats.completedRuns} réalisées</span>
            </div>
            <div className="weekly-recap__legend weekly-recap__legend--left">
              <span className="weekly-recap__dot weekly-recap__dot--left" />
              <span>{stats.remainingRuns} restantes</span>
            </div>
          </div>
        </article>

        <div className="weekly-recap__summary">
          <article className="weekly-recap__summary-card">
            <p className="weekly-recap__summary-label">Durée d'activité</p>
            <p className="weekly-recap__summary-value weekly-recap__summary-value--primary">
              {stats.totalDuration.toFixed(0)}
              <span className="weekly-recap__summary-unit"> minutes</span>
            </p>
          </article>

          <article className="weekly-recap__summary-card">
            <p className="weekly-recap__summary-label">Distance</p>
            <p className="weekly-recap__summary-value weekly-recap__summary-value--secondary">
              {stats.totalDistance.toFixed(1)}
              <span className="weekly-recap__summary-unit"> kilomètres</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
