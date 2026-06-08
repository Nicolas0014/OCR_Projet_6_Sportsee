import { apiClient, endpoints } from "../../lib";

export const apiDataProvider = {
  async getUserProfile(authToken) {
    return apiClient(endpoints.meProfile, authToken);
  },
  async getRunsByDateRange(authToken, startWeek, endWeek) {
    if (!startWeek || !endWeek) {
      throw new Error("startWeek and endWeek are required");
    }

    const params = new URLSearchParams();
    params.set("startWeek", startWeek);
    params.set("endWeek", endWeek);

    const query = params.toString();
    const path = query ? `${endpoints.meRuns}?${query}` : endpoints.meRuns;

    return apiClient(path, authToken);
  },
};
