import "./login.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/background_picture.png";
import { apiClient } from "../lib";

export default function Login() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      const response = await apiClient("/api/login", null, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      // Stocker le token d'authentification dans le localStorage -> stocker dans les cookies pour une meilleure sécurité
      localStorage.setItem("authToken", response.token);

      // Rediriger vers le dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Échec de la connexion : " + error.message);
    }
  };

  return (
    <div id="login">
      {/* ── Left panel ── */}
      <div className="login__left">
        <img src={logo} alt="SportSee logo" className="login__logo" />

        <div className="login__card">
          <h1 className="login__card-title">
            Transformez vos stats en résultats
          </h1>
          <h2 className="login__card-subtitle typo-name">Se connecter</h2>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__field">
              <label htmlFor="email" className="login__label typo-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="profile"
                className="login__input"
              />
            </div>

            <div className="login__field">
              <label htmlFor="password" className="login__label typo-label">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="login__input"
              />
            </div>

            <button type="submit" className="login__submit">
              Se connecter
            </button>

            <div className="login__forgot">
              <a href="#">Mot de passe oublié ?</a>
            </div>
          </form>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="login__right">
        <img src={bgImage} alt="Sport background" className="login__bg-image" />

        <div className="login__caption">
          <span>
            Analysez vos performances en un clin d'œil, suivez vos progrès et
            atteignez vos objectifs.
          </span>
        </div>
      </div>
    </div>
  );
}
