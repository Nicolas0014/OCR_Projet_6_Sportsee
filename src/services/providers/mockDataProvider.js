import mockUser from "../../../src/data/mock_user.json";
import mockRuns from "../../../src/data/mock_runs.json";

export const mockDataProvider = {
  async getUserProfile() {
    return mockUser;
  },
  async getRunsByDateRange(startWeek, endWeek) {
    if (!startWeek || !endWeek) {
      return mockRuns;
    }

    return mockRuns.filter((run) => run.date >= startWeek && run.date <= endWeek);
  },
};
