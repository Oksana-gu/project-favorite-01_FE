"use client";

import React, { useState } from "react";
import Image from "next/image";
import css from "./Profile.module.css";
import type { User } from "@/types/auth";
import formatUserName from "@/utils/getShortUsernameHeader";
import { useRouter } from "next/navigation";

interface ProfileProps {
  user: User | null;
  onNavigate?: () => void;
}

const LOCAL_DEFAULT_AVATAR = "/default-avatar.png";

export default function Profile({ user, onNavigate }: ProfileProps) {
  const router = useRouter();
  const [hasError, setHasError] = useState<boolean>(false);

  const isCustomAvatarValid =
    Boolean(user?.avatarUrl) && user?.avatarUrl?.trim() !== "";

  const avatarSrc =
    !hasError && isCustomAvatarValid
      ? (user?.avatarUrl as string)
      : LOCAL_DEFAULT_AVATAR;

  const handleLogout = (): void => {
    router.push("/confirmation");
    onNavigate?.();
  };

  return (
    <div className={css.profileWrapper}>
      <div className={css.editButton}>
        <Image
          key={user?.avatarUrl || "default"}
          className={css.profileImage}
          src={avatarSrc}
          alt="Profile image"
          width={32}
          height={32}
          unoptimized
          loading="eager"
          onError={() => setHasError(true)}
        />
        <span className={css.profileName}>{formatUserName(user?.name)}</span>
      </div>

      <span className={css.profileBorder}></span>

      <button
        className={css.profileLogoutButton}
        onClick={handleLogout}
        type="button"
        aria-label="Вийти з профілю"
      >
        {React.createElement(
          "svg",
          { className: css.profileLogoutIcon, "aria-hidden": "true" },
          React.createElement("use", { href: "/sprite.svg#logout" }),
        )}
      </button>
    </div>
  );
}