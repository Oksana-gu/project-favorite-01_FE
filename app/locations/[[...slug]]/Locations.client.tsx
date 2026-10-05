"use client";

import FilterPanel from "@/components/Locations/FilterPanel/FilterPanel";
import LocationGrid from "@/components/Locations/LocationsGrid/LocationsGrid";
import { getLocations } from "@/lib/locationsApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSyncExternalStore } from "react";
import css from "./Locations.client.module.css";

const DESKTOP_MEDIA_QUERY = "(min-width: 1440px)";

const subscribeToDesktopBreakpoint = (onChange: () => void) => {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
};

const getDesktopSnapshot = () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
const getServerDesktopSnapshot = () => false;

interface LocationsClientProps {
  region: string | undefined;
  locationType: string | undefined;
  sort: string | undefined;
  search: string | undefined;
}

export default function LocationsClient({
  region,
  locationType,
  sort,
  search,
}: LocationsClientProps) {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopBreakpoint,
    getDesktopSnapshot,
    getServerDesktopSnapshot,
  );
  const pageSize = isDesktop ? 9 : 6;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage = false,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["locations", search, region, locationType, sort, pageSize],
    queryFn: ({ pageParam }) =>
      getLocations({
        page: pageParam,
        limit: pageSize,
        search,
        region,
        locationType,
        sort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    placeholderData: (prev) => prev,
  });
  const locations = data?.pages.flatMap((page) => page.locations) ?? [];

  return (
    <div className={css.content}>
      <FilterPanel region={region} locationType={locationType} sort={sort} />
      <LocationGrid
        locations={locations}
        hasNextPage={hasNextPage}
        isLoading={isPending}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={() => {
          void fetchNextPage();
        }}
        error={error}
      />
    </div>
  );
}
