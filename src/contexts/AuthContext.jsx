import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
