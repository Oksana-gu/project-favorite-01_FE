'use client';

import LocationCard from '@/components/Home/PopularLocationsBlock/LocationCard/LocationCard';
import { Location } from '@/types/profile';
import { useQueryClient } from '@tanstack/react-query';

interface LocationGridProps {
  locations: Location[];
}

export default function LocationGrid({ locations }: LocationGridProps) {
  const queryClient = useQueryClient();
  return (
    <div>
      {locations.map(location => (
        <LocationCard location={location} key={location._id} />
        //   <div key={location._id}>
        //     <p>{location.name}</p>
        //   </div>
      ))}
    </div>
  );
}
