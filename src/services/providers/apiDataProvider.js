import { apiClient, endpoints } from "../../lib";

// Récupère le token d'authentification depuis le localStorage
const authToken = localStorage.getItem("authToken");

export const apiDataProvider = {
  async getUserProfile() {
    return apiClient(endpoints.meProfile, authToken);
  },
  async getRunsByDateRange(startWeek, endWeek) {
    return apiClient(endpoints.meRuns, authToken, {
      method: "POST",
      body: JSON.stringify({ startWeek, endWeek }),
    });
  },
};
