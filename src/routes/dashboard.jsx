import UserProfileCard from "../components/UserProfileCard";
import HeartRateSection from "../components/HeartRateSection";
import WeeklyDistanceSection from "../components/WeeklyDistanceSection";
import "./dashboard.css";

// ── Mock user ──────────────────────────────────

const USER = {
  firstName: "Sophie",
  lastName: "Martin",
  createdAt: "2025-01-01",
  age: 32,
  weight: 60,
  height: 165,
  profilePicture: "/src/assets/profilPicture.jpg",
  statistics: {
    totalDistance: 120,
    totalSessions: 15,
    totalDuration: 900,
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div id="dashboard">
      <UserProfileCard user={USER} />

      <div className="charts-row">
        <div className="charts-row__left">
          <WeeklyDistanceSection />
        </div>
        <div className="charts-row__right">
          <HeartRateSection />
        </div>
      </div>
    </div>
  );
}
