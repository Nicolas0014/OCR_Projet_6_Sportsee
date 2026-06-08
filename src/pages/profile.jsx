import useUserProfile from "../hooks/useUserProfile";
import "./profile.css";

function formatDuration(minutes = 0) {
  const safeMinutes = Number(minutes) || 0;
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}min`;
  }

  return `${remainingMinutes}min`;
}

function formatGender(gender) {
  if (gender === "female") {
    return "Femme";
  }

  if (gender === "male") {
    return "Homme";
  }

  return gender || "Non renseigné";
}

export default function Profile() {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className="error">Erreur lors du chargement du profil.</p>;
  }

  if (!user) {
    return <p>Aucune donnée utilisateur disponible.</p>;
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const statisticsCards = [
    {
      label: "Temps total couru",
      value: formatDuration(user.statistics.totalDuration),
      unit: "",
    },
    {
      label: "Calories brûlées",
      value: user.statistics.totalCaloriesBurned,
      unit: "cal",
    },
    {
      label: "Distance totale parcourue",
      value: user.statistics.totalDistance,
      unit: "km",
    },
    {
      label: "Nombre de jours de repos",
      value: user.statistics.totalBreakDays,
      unit: "jours",
    },
    {
      label: "Nombre de sessions",
      value: user.statistics.totalSessions,
      unit: "sessions",
    },
  ];

  return (
    <section id="profile" className="profile-page container">
      <div className="profile-page__left-column">
        <article className="profile-page__card profile-page__identity">
          <img
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="profile-page__avatar"
          />

          <div className="profile-page__identity-content">
            <h1 className="profile-page__name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="typo-label">Membre depuis le {memberSince}</p>
          </div>
        </article>

        <article className="profile-page__card profile-page__details">
          <h2 className="profile-page__details-title">Votre profil</h2>
          <div className="profile-page__separator" />

          <ul className="profile-page__details-list">
            <li>Âge : {user.age}</li>
            <li>Genre : {formatGender(user.gender)}</li>
            <li>Taille : {user.height} cm</li>
            <li>Poids : {user.weight} kg</li>
          </ul>
        </article>
      </div>

      <div className="profile-page__right-column">
        <header>
          <h2 className="profile-page__stats-title">Vos statistiques</h2>
          <p className="typo-label">depuis le {memberSince}</p>
        </header>

        <div className="profile-page__stats-grid">
          {statisticsCards.map((card) => (
            <article key={card.label} className="profile-page__stat-card">
              <span className="profile-page__stat-label">{card.label}</span>
              <p className="profile-page__stat-value">
                {card.value}
                {card.unit ? ` ${card.unit}` : ""}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
