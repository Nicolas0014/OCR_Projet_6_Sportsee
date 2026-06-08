import { Outlet, NavLink } from "react-router-dom";
import "./authenticated-root.css";
import logo from "../assets/logo.png";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export default function AuthenticatedRoot() {
  const { authToken, isAuthLoading, logout } = useContext(AuthContext);

  if (isAuthLoading) {
    return null;
  }

  if (!authToken) {
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
              <button className="auth-navbar__logout" onClick={logout}>
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
