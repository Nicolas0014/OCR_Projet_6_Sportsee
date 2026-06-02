import { mockDataProvider } from "../providers/mockDataProvider";
import { toProfileModel } from "../mappers/profileMapper";

export const mockService = {
  async getUserProfile() {
    const rawProfile = await mockDataProvider.getUserProfile();

    return toProfileModel(rawProfile);
  },

  async getRunsByDateRange(startWeek, endWeek) {
    return await mockDataProvider.getRunsByDateRange(startWeek, endWeek);
  },
};
