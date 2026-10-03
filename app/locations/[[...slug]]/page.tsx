import { getLocations } from '@/lib/locationsApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LocationsClient from './Locations.client';
import FilterPanel from '@/components/Locations/FilterPanel/FilterPanel';

interface LocationPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug = [] } = await params;
  const region = slug[0] && slug[0] !== 'all' ? slug[0] : undefined;
  const locationType = slug[1] && slug[1] !== 'all' ? slug[1] : undefined;
  const sort = slug[3] && slug[3] !== 'all' ? slug[3] : undefined;
  //   const regionKey = slug[0] ?? 'all';
  //   const region = regionKey === 'all' ? undefined : regionKey;
  //   const locationTypeKey = slug[1] ?? 'all';
  //   const locationType = locationTypeKey === 'all' ? undefined : locationTypeKey;
  //   const sortKey = slug[3] ?? 'all';
  //   const sort = sortKey === 'all' ? undefined : sortKey;

  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ['location', undefined, region, locationType, sort, 1],
      queryFn: () =>
        getLocations({
          page: 1,

          search: undefined,
          region: region,
          locationType: locationType,
          sort: sort,
        }),
    })
    .catch(() => undefined);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>Усі місця відпочинку</h1>
        {/* <LocationsClient
          region={region}
          locationType={locationType}
          sort={sort}
        ></LocationsClient> */}
        <FilterPanel region={region} locationType={locationType} sort={sort} />
      </HydrationBoundary>
    </>
  );
}
