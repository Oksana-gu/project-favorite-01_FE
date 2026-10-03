'use client';

import css from './FilterPanel.module.css';
import { AppButton } from '@/components/Ui/Button/Button';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface FilterPanelProps {
  region: string | undefined;
  locationType: string | undefined;
  sort: string | undefined;
}

export default function FilterPanel({
  region,
  locationType,
  sort,
}: FilterPanelProps) {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }, 1000);

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={css.searchInput}
        autoComplete="off"
        type="text"
        name="query"
        value={search}
        onChange={e => handleSearch(e.target.value)}
        placeholder="Пошук"
        aria-label="Пошук"
      />
      <AppButton
        className={css.searchButton}
        type="submit"
        aria-label="Знайти місце"
      >
        Знайти місце
      </AppButton>
    </form>
  );
}
