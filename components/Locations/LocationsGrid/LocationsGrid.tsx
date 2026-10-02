'use client';

import css from './LocationGrid.module.css';
import LocationCard from '@/components/Home/PopularLocationsBlock/LocationCard/LocationCard';
import { AppButton } from '@/components/Ui/Button/Button';
import { Location } from '@/types/profile';
import { useQueryClient } from '@tanstack/react-query';

interface LocationGridProps {
  locations: Location[];
}

export default function LocationGrid({ locations }: LocationGridProps) {
  const queryClient = useQueryClient();
  return (
    <div className={css.container}>
      {locations.map(location => (
        <LocationCard location={location} key={location._id} />
      ))}
      <AppButton
        className={css.searchButton}
        type="button"
        aria-label="Показати ще"
      >
        Показати ще
      </AppButton>
    </div>
  );
}
