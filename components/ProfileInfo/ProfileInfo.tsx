import Image from "next/image";
import css from "./ProfileInfo.module.css";

interface ProfileInfoProps {
  avatar?: string | null;
  username: string;
  locationsCount?: number;
}

const ProfileInfo = ({
  avatar,
  username,
  locationsCount,
}: ProfileInfoProps) => {
  return (
    <div className={css.profile}>
      {avatar ? (
        <Image
          className={css.avatar}
          src={avatar}
          alt={`Аватар користувача ${username}`}
          width={145}
          height={145}
        />
      ) : (
        <div
          className={`${css.avatar} ${css.avatarPlaceholder}`}
          aria-label="Аватар користувача відсутній"
        />
      )}
      <div className={css.avatarContent}>
        <h1 className={css.username}>{username}</h1>

        <p className={css.articlesCount}>Статей: {locationsCount ?? 0}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
