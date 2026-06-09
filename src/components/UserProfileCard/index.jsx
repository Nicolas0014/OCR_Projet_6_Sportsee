import "./UserProfileCard.css";
import achievementIcon from "../../assets/achievement.png";
import useUserProfile from "../../hooks/useUserProfile";

export default function UserProfileCard() {
  const { data: user, isLoading, error } = useUserProfile();
  let memberSince = "";

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return (
      <p className="error">
        Erreur lors du chargement des données utilisateur.
      </p>
    );
  }

  if (!user) {
    return <p>Aucune donnée utilisateur disponible.</p>;
  }

  memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    user && (
      <div className="profile-card container">
        {/* ── Gauche : avatar + identité ── */}
        <div className="profile-card__identity">
          <div className="profile-card__avatar-wrapper">
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="profile-card__avatar"
            />
          </div>
          <div className="profile-card__name-block">
            <span className="typo-name">
              {user.firstName} {user.lastName}
            </span>
            <span className="typo-label">Membre depuis le {memberSince}</span>
          </div>
        </div>

        {/* ── Droite : statistique clé ── */}
        <div className="profile-card__stats">
          <span className="typo-label profile-card__stat-label">
            Distance totale parcourue
          </span>
          <div className="profile-card__stat-box">
            <img
              src={achievementIcon}
              alt="achievement"
              className="profile-card__stat-icon"
            />
            <span className="profile-card__stat-value">
              {user.statistics.totalDistance} km
            </span>
          </div>
        </div>
      </div>
    )
  );
}
