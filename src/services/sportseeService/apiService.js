import { apiDataProvider } from "../providers/apiDataProvider";
import { toProfileModel } from "../mappers/profileMapper";

export const apiService = {
  async getUserProfile(authToken) {
    const rawProfile = await apiDataProvider.getUserProfile(authToken);

    return toProfileModel(rawProfile);
  },

  async getRunsByDateRange(authToken, startWeek, endWeek) {
    const rawRuns = await apiDataProvider.getRunsByDateRange(
      authToken,
      startWeek,
      endWeek,
    );
    return rawRuns;
  },
};
