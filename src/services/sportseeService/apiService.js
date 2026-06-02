import { apiDataProvider } from "../providers/apiDataProvider";
import { toProfileModel } from "../mappers/profileMapper";

export const apiService = {
  async getUserProfile() {
    const rawProfile = await apiDataProvider.getUserProfile();

    return toProfileModel(rawProfile);
  },

  async getRunsByDateRange(startWeek, endWeek) {
    return await apiDataProvider.getRunsByDateRange(startWeek, endWeek);
  },
};
