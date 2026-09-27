import Image from "next/image";

const ProfileInfo = ({ avatar, username, locationsCount }) => {
  return (
    <div>
      <Image src={avatar} alt={username} width={120} height={120} />

      <h1>{username}</h1>

      <p>Статей: {locationsCount}</p>
    </div>
  );
};

export default ProfileInfo;
