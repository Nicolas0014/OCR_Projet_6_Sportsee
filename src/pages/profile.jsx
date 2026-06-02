export default function Profile() {
  const profile = {
    weeklyGoal: 2,
    firstName: "Sophie",
    lastName: "Martin",
    username: "sophiemartin",
    age: 32,
    gender: "female",
    profilePicture: "http://localhost:8000/images/sophie.jpg",
    height: 165,
    weight: 60,
    createdAt: "2025-01-01",
  };

  return (
    <div id="profile">
      <div>
        <img
          key={profile.id}
          src={profile.profilePicture}
          width={200}
          height={200}
        />
      </div>

      <div>
        <h1>
          {profile.firstName || profile.lastName ? (
            <>
              {profile.firstName} {profile.lastName}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>
      </div>
    </div>
  );
}
