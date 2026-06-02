import { useEffect, useState } from "react";
import { apiService } from "../services/sportseeService/apiService";
import { mockService } from "../services/sportseeService/mockService";

const source = import.meta.env.VITE_DATA_SOURCE;

export default function useUserProfile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sportseeService = source === "mock" ? mockService : apiService;

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      setError(null);

      try {
        const profile = await sportseeService.getUserProfile();
        setData(profile);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Une erreur inconnue est survenue."),
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  return {
    data,
    isLoading,
    error,
    setData,
    getRunsByDateRange: sportseeService.getRunsByDateRange,
  };
}
