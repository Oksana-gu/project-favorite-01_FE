import { cookies } from "next/headers";

import ProfileInfo from "@/components/ProfileInfo/ProfileInfo.jsx";
import LocationsGrid from "@/components/LocationsGrid/LocationsGrid.jsx";
import EmptyState from "@/components/EmptyState/EmptyState.jsx";

import css from "./ProfilePage.module.css";

const ProfilePage = async ({ params }) => {
  const { userId } = await params;

  const profileResponse = await fetch(
    `http://localhost:3030/api/users/${userId}`,
  );

  if (!profileResponse.ok) {
    throw new Error("Не вдалося отримати інформацію про користувача");
  }

  const profileData = await profileResponse.json();
  const profileUser = profileData.data;

  let isOwnProfile = false;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionId = cookieStore.get("sessionId")?.value;

  if (accessToken && sessionId) {
    const currentUserResponse = await fetch(
      "http://localhost:3030/api/users/me",
      {
        headers: {
          Cookie: `accessToken=${accessToken}; sessionId=${sessionId}`,
        },
      },
    );

    if (currentUserResponse.ok) {
      const currentUserData = await currentUserResponse.json();
      const currentUser = currentUserData.data;

      isOwnProfile = currentUser.id === profileUser._id;
    }
  }

  const locationsResponse = await fetch(
    `http://localhost:3030/api/users/${userId}/locations?page=1&perPage=10`,
  );

  if (!locationsResponse.ok) {
    throw new Error("Не вдалося отримати локації користувача");
  }

  const locationsData = await locationsResponse.json();

  const locations = locationsData.locations;

  return (
    <main>
      <section className={css.pageHeader}>
        <div className={css.container}>
          <ProfileInfo
            avatar={profileUser.avatarUrl}
            username={profileUser.name}
            locationsCount={profileUser.articlesAmount}
          />
        </div>
      </section>

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
