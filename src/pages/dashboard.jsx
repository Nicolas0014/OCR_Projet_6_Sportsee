import UserProfileCard from "../components/UserProfileCard";
import HeartRateSection from "../components/HeartRateSection";
import WeeklyDistanceSection from "../components/WeeklyDistanceSection";
import WeeklyRecap from "../components/WeeklyRecap";
import "./dashboard.css";

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div id="dashboard">
      <UserProfileCard />

      <div className="charts-row">
        <div className="charts-row__left">
          <WeeklyDistanceSection />
        </div>
        <div className="charts-row__right">
          <HeartRateSection />
        </div>
      </div>

      <WeeklyRecap />
    </div>
  );
}
