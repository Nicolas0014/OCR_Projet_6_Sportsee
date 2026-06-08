export function toProfileModel(rawProfile) {
  return {
    firstName: rawProfile.profile.firstName,
    lastName: rawProfile.profile.lastName,
    age: rawProfile.profile.age,
    height: rawProfile.profile.height,
    weight: rawProfile.profile.weight,
    createdAt: rawProfile.profile.createdAt,
    profilePicture: rawProfile.profile.profilePicture,
    statistics: {
      totalDistance: rawProfile.statistics.totalDistance,
      totalSessions: rawProfile.statistics.totalSessions,
      totalDuration: rawProfile.statistics.totalDuration,
    },
  };
}
