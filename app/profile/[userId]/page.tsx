import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProfileInfo from "@/components/ProfileInfo/ProfileInfo";
import ProfileClient from "./ProfilePage.client";
import css from "./ProfilePage.module.css";
import type { CurrentUserResponse, UserProfileResponse } from "@/types/profile";

const API_URL = (process.env.BACKEND_API_URL ?? process.env.NEXT_PUBLIC_API_URL)
  ?.replace(/\/+$/, "")
  .replace(/\/api$/, "");

interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = await params;

  if (!API_URL) {
    throw new Error(
      "BACKEND_API_URL or NEXT_PUBLIC_API_URL must be configured",
    );
  }

  const profileResponse = await fetch(
    `${API_URL}/api/users/${encodeURIComponent(userId)}`,
    { cache: "no-store" }
  );

  if (profileResponse.status === 404) {
    notFound();
  }

  if (!profileResponse.ok) {
    throw new Error("Не вдалося отримати інформацію про користувача");
  }

  const profileData: UserProfileResponse = await profileResponse.json();
  const profileUser = profileData.data;

  let isOwnProfile = false;

  const cookieStore = await cookies();
  const cookieHeader: string = cookieStore.toString();

  if (cookieHeader) {
    try {
      const currentUserResponse: Response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      });

      if (currentUserResponse.ok) {
        const currentUserData: CurrentUserResponse = await currentUserResponse.json();
        const currentUser = currentUserData.data;

        isOwnProfile = currentUser.id === profileUser._id;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Помилка під час перевірки поточного користувача:", err.message);
      } else {
        console.error("Невідома помилка під час перевірки користувача");
      }
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