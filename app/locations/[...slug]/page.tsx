import { getLocations } from '@/lib/locationsApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface LocationPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const regionKey = slug[0] ?? 'all';
  const region = regionKey === 'all' ? undefined : regionKey;
  const locationTypeKey = slug[1] ?? 'all';
  const locationType = locationTypeKey === 'all' ? undefined : locationTypeKey;
  const sortKey = slug[3] ?? 'all';
  const sort = sortKey === 'all' ? undefined : sortKey;

  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ['locations'],
      queryFn: () =>
        getLocations({
          page: 1,
          limit: 6,
          search: 'undefined',
          region: region,
          locationType: locationType,
          sort: sort,
        }),
    })
    .catch(() => undefined);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <h1>Усі місця відпочинку</h1>;
      </HydrationBoundary>
    </>
  );
}
