import { useEffect, useState, useContext } from "react";
import { apiService } from "../services/sportseeService/apiService";
import { mockService } from "../services/sportseeService/mockService";
import { AuthContext } from "../contexts/AuthContext";

const source = import.meta.env.VITE_DATA_SOURCE;

export default function useRuns(startWeek, endWeek) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sportseeService = source === "mock" ? mockService : apiService;
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    async function loadRuns(startWeek, endWeek) {
      setIsLoading(true);
      setError(null);

      try {
        const runs = await sportseeService.getRunsByDateRange(
          authToken,
          startWeek,
          endWeek,
        );
        setData(runs);
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

    loadRuns(startWeek, endWeek);
  }, [authToken, startWeek, endWeek]);

  return {
    data,
    isLoading,
    error,
  };
}
