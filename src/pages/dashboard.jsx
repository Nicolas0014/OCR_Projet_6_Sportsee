import UserProfileCard from "../components/UserProfileCard";
import HeartRateSection from "../components/HeartRateSection";
import WeeklyDistanceSection from "../components/WeeklyDistanceSection";
import "./dashboard.css";
import useUserProfile from "../hooks/useUserProfile";

// ── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { data: user, isLoading, error } = useUserProfile();

  return (
    <div id="dashboard">
      {isLoading && <p>Chargement...</p>}
      {!isLoading && !error && user && <UserProfileCard user={user} />}

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
