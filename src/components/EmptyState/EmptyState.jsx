import Link from "next/link";

const EmptyState = ({ isOwnProfile }) => {
  return (
    <div>
      {isOwnProfile ? (
        <>
          <p>Ви ще нічого не публікували, поділіться своєю першою локацією!</p>
          <Link href="/locations/add">Поділитись локацією</Link>
        </>
      ) : (
        <>
          <p>Цей користувач ще не ділився локаціями</p>
          <Link href="/">Назад до локацій</Link>
        </>
      )}
    </div>
  );
};

export default EmptyState;
