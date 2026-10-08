"use client";

import Image from "next/image";
import { useState } from "react";
import css from "./ProfileInfo.module.css";

interface ProfileInfoProps {
  avatar?: string;
  username: string;
  locationsCount?: number;
}

const LOCAL_DEFAULT_AVATAR = "/default-avatar.png";

export default function ProfileInfo({
  avatar,
  username,
  locationsCount = 0,
}: ProfileInfoProps) {
  const isValidAvatar =
    Boolean(avatar) &&
    typeof avatar === "string" &&
    avatar.trim().startsWith("http");

  const initialAvatarSrc = isValidAvatar
    ? (avatar as string)
    : LOCAL_DEFAULT_AVATAR;

  const [imgSrc, setImgSrc] = useState<string>(initialAvatarSrc);

  const handleError = () => {
    if (imgSrc !== LOCAL_DEFAULT_AVATAR) {
      setImgSrc(LOCAL_DEFAULT_AVATAR);
    }
  };

  return (
    <div className={css.profile}>
      <Image
        className={css.avatar}
        src={imgSrc}
        alt={`Аватар користувача ${username}`}
        width={120}
        height={120}
        priority
        onError={handleError}
      />
      <div className={css.avatarContent}>
        <h1 className={css.username}>{username}</h1>
        <p className={css.stats}>Статей: {locationsCount}</p>
      </div>
    </div>
  );
}
