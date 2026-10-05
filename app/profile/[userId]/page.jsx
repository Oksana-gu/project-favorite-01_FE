import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo.jsx";
import ProfileClient from "./ProfilePage.client.jsx";
import css from "./ProfilePage.module.css";

const API_URL = process.env.BACKEND_API_URL;

const ProfilePage = async ({ params }) => {
  const { userId } = await params;

  const profileResponse = await fetch(`${API_URL}/api/users/${userId}`);

  if (profileResponse.status === 404) {
    notFound();
  }

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
    const currentUserResponse = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        Cookie: `accessToken=${accessToken}; sessionId=${sessionId}`,
      },
    });

    if (currentUserResponse.ok) {
      const currentUserData = await currentUserResponse.json();
      const currentUser = currentUserData.data;

      isOwnProfile = currentUser.id === profileUser._id;
    }
  }

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

      <div className={css.locationsContainer}>
        {!isOwnProfile && <h2 className={css.locationsTitle}>Локації</h2>}

        <ProfileClient userId={userId} isOwnProfile={isOwnProfile} />
      </div>
    </main>
  );
};

export default ProfilePage;
