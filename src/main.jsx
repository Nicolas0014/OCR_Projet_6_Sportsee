import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import AuthenticatedRoot from "./routes/authenticated-root";
import ErrorPage from "./error-page";
import Profile from "./routes/profile";
import Dashboard from "./routes/dashboard";
import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AuthenticatedRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard/:userId",
        element: <Dashboard />,
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
