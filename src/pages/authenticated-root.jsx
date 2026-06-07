import { Outlet, NavLink } from "react-router-dom";
import "./authenticated-root.css";
import logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";

export default function AuthenticatedRoot() {
  // Vérifier le token d'authentification ici
  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  function handleLogout() {
    // Retirer le token d'authentification ici
    localStorage.removeItem("authToken");

    // Rediriger vers la page de login
    return <Navigate to="/login" />;
  }

  return (
    <div className="auth-layout">
      <header>
        <nav className="auth-navbar container">
          <img src={logo} alt="SportSee" className="auth-navbar__logo" />

          <ul className="auth-navbar__links">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `auth-navbar__link${isActive ? " active" : ""}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `auth-navbar__link${isActive ? " active" : ""}`
                }
              >
                Mon Profil
              </NavLink>
            </li>
            <li>
              <button className="auth-navbar__logout" onClick={handleLogout}>
                Se déconnecter
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
}
