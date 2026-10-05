import { getLocations } from "@/lib/locationsApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import LocationsClient from "./Locations.client";
import css from "./LocationPage.module.css";

type LocationsPage = Awaited<ReturnType<typeof getLocations>>;

interface LocationPageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{
    region?: string;
    locationType?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function LocationPage({
  params,
  searchParams,
}: LocationPageProps) {
  const { slug = [] } = await params;
  const filters = await searchParams;
  const region = filters.region ?? (slug[0] === "all" ? undefined : slug[0]);
  const locationType =
    filters.locationType ?? (slug[1] === "all" ? undefined : slug[1]);
  const sort = filters.sort ?? (slug[3] === "all" ? undefined : slug[3]);
  const search = filters.search;

  const queryClient = new QueryClient();

  await queryClient
    .infiniteQuery({
      queryKey: ["locations", search, region, locationType, sort, 6],
      queryFn: ({ pageParam }) =>
        getLocations({
          page: pageParam,
          limit: 6,
          search,
          region,
          locationType,
          sort,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage: LocationsPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    })
    .catch(() => undefined);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={css.container}>
          <h1 className={css.title}>Усі місця відпочинку</h1>
          <LocationsClient
            key={`${search ?? ""}|${region ?? ""}|${locationType ?? ""}|${sort ?? ""}`}
            region={region}
            locationType={locationType}
            sort={sort}
            search={search}
          ></LocationsClient>
        </div>
      </HydrationBoundary>
    </>
  );
}
