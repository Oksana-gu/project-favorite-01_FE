'use client';

import LocationCard from '@/components/Home/PopularLocationsBlock/LocationCard/LocationCard';
import { Location } from '@/types/profile';
import { useQueryClient } from '@tanstack/react-query';

interface LocationGridProps {
  locations: Location[];
}

export default function LocationGrid({ locations }: LocationGridProps) {
  const queryClient = useQueryClient();
  return <LocationCard location={} />;
}
