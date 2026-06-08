import "./login.css";
import logo from "../assets/logo.png";
import bgImage from "../assets/background_picture.png";
import { apiClient } from "../lib";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [errorLogin, setErrorLogin] = useState(null);
  const { authToken, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      navigate("/dashboard");
    }
  }, [authToken, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      setErrorLogin(null);
      const response = await apiClient("/api/login", null, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      login(response.token);

      navigate("/dashboard");
    } catch (error) {
      setErrorLogin("Email ou mot de passe incorrect.");
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

            {errorLogin && <div className="login__error">{errorLogin}</div>}

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
