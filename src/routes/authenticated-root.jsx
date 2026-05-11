import { Outlet, Link } from "react-router-dom";

export default function AuthenticatedRoot() {
  // Vérifier le token d'authentification ici
  return (
    <>
      <div id="sidebar">
        <h1>React Router</h1>

        <nav>
          <ul>
            <li>
              <Link to="/dashboard/1">Dashboard</Link>
            </li>
            <li>
              <Link to="/profile/1">Profile</Link>
            </li>
            {/* Retirer le token d'authentification ici */}
            <li>Déconnexion</li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
