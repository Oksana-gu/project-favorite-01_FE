import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import LocationsGrid from "@/components/LocationsGrid/LocationsGrid";
import EmptyState from "@/components/EmptyState/EmptyState";

const ProfilePage = async ({ params }) => {
  const { userId } = await params;

  const profileResponse = await fetch(
    `http://localhost:3030/api/users/${userId}`,
  );

  const profileUser = await profileResponse.json();

  const currentUserResponse = await fetch("http://localhost:3030/api/users");

  const currentUser = await currentUserResponse.json();

  const locationsResponse = await fetch(
    `http://localhost:3030/api/users/${userId}/locations?page=1&limit=10`,
  );

  const locationsData = await locationsResponse.json();

  const isOwnProfile = currentUser._id === profileUser._id;

  const locations = locationsData.locations;

  return (
    <main>
      <ProfileInfo
        avatar={profileUser.avatarUrl}
        username={profileUser.name}
        locationsCount={profileUser.articlesAmount}
      />

      {locations.length > 0 ? (
        <>
          {!isOwnProfile && <h2>Локації</h2>}

          <LocationsGrid locations={locations} isOwnProfile={isOwnProfile} />
        </>
      ) : (
        <EmptyState isOwnProfile={isOwnProfile} />
      )}
    </main>
  );
};

export default ProfilePage;
