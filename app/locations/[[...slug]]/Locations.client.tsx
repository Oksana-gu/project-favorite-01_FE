'use client';

import LocationGrid from '@/components/Locations/LocationsGrid/LocationsGrid';
import Pagination from '@/components/Locations/Pagination/Pagination';
import { AppButton } from '@/components/Ui/Button/Button';
import { getLocations } from '@/lib/locationsApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface LocationsClientProps {
  region: string | undefined;
  locationType: string | undefined;
  sort: string | undefined;
}

export default function LocationsClient({
  region,
  locationType,
  sort,
}: LocationsClientProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = useDebouncedCallback((search: string) => {
    // console.log(search);

    setSearch(search);
    setCurrentPage(1);
  }, 1000);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['location', search, region, locationType, sort, currentPage],
    queryFn: () =>
      getLocations({
        page: currentPage,
        search: search,
        region: region,
        locationType: locationType,
        sort: sort,
      }),
    placeholderData: prev => prev,
  });
  const totalPages = data?.totalPages ?? 0;

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (search.trim() === '') {
  //       router.push('/locations');
  //       return;
  //     }
  //     router.push('/locations?search=' + encodeURIComponent(query));
  //   };

  const handleSubmit = () => {};

  return (
    <div>
      {isLoading && <p>Loading, please wait...</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            // className={css.searchInput}
            autoComplete="off"
            type="text"
            name="query"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Пошук"
            aria-label="Пошук"
          />
          <AppButton
            // className={css.searchButton}
            type="submit"
            aria-label="Знайти місце"
          >
            Знайти місце
          </AppButton>
        </form>
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {isSuccess && data && <LocationGrid locations={data.locations} />}
    </div>
  );
}
