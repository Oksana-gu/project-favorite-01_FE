// import { useState } from 'react';
// import { useDebouncedCallback } from 'use-debounce';

// interface FilterPanelProps {
//   region: string | undefined;
//   locationType: string | undefined;
//   sort: string | undefined;
// }

// export default function FilterPanel({
//   region,
//   locationType,
//   sort,
// }: FilterPanelProps) {
//   const [search, setSearch] = useState<string | undefined>(undefined);
//   const [currentPage, setCurrentPage] = useState(1);
//   const handleSearch = useDebouncedCallback((search: string) => {
//     setSearch(search);
//     setCurrentPage(1);
//   }, 1000);

//   const handleSubmit = () => {};

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         autoComplete="off"
//         type="text"
//         name="query"
//         // value={query}
//         // onChange={e => setQuery(e.target.value)}
//         placeholder="Введіть назву, тип або регіон..."
//         aria-label="Введіть назву, тип або регіон"
//       />
//       <AppButton
//         // className={css.searchButton}
//         type="submit"
//         aria-label="Знайти місце"
//       >
//         Знайти місце
//       </AppButton>
//     </form>
//   );
// }
