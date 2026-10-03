"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import LocationsGrid from "@/components/Locations/LocationsGrid/LocationsGrid";
import ProfilePlaceholder from "@/components/ProfilePlaceholder/ProfilePlaceholder.jsx";

const ProfileClient = ({ userId, isOwnProfile }) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["profileLocations", userId],

    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `https://project-favorite-01-be.onrender.com/api/users/${userId}/locations?page=${pageParam}&limit=10`,
      );

      if (!response.ok) {
        throw new Error("Не вдалося завантажити локації");
      }

      return response.json();
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const locations = data?.pages.flatMap((page) => page.data ?? []) ?? [];

  if (!isPending && !error && locations.length === 0) {
    return <ProfilePlaceholder isOwnProfile={isOwnProfile} />;
  }

  return (
    <LocationsGrid
      locations={locations}
      isOwnProfile={isOwnProfile}
      hasNextPage={hasNextPage}
      isLoading={isPending}
      isFetchingNextPage={isFetchingNextPage}
      onLoadMore={() => {
        void fetchNextPage();
      }}
      error={error}
    />
  );
};

export default ProfileClient;
