export function toProfileModel(rawProfile) {
  return {
    firstName: rawProfile.profile.firstName,
    lastName: rawProfile.profile.lastName,
    age: rawProfile.profile.age,
    gender: rawProfile.profile.gender,
    height: rawProfile.profile.height,
    weight: rawProfile.profile.weight,
    createdAt: rawProfile.profile.createdAt,
    profilePicture: rawProfile.profile.profilePicture,
    weeklyGoals: rawProfile.profile.weeklyGoals,
    statistics: {
      totalDistance: rawProfile.statistics.totalDistance,
      totalSessions: rawProfile.statistics.totalSessions,
      totalDuration: rawProfile.statistics.totalDuration,
      totalCaloriesBurned: rawProfile.statistics.totalCaloriesBurned,
      totalBreakDays: rawProfile.statistics.totalBreakDays,
    },
  };
}
