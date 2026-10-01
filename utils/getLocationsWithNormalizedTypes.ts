import { Location } from "@/types/profile";

export type LocationTypeItem = {
  slug: string;
  type: string;
  shortDescription?: string;
};

export function normalizeLocationsByType(
  locations: Location[] = [],
  locationTypes: LocationTypeItem[] = []
): Location[] {
  if (!Array.isArray(locations) || locations.length === 0) {
    return [];
  }

  if (!Array.isArray(locationTypes) || locationTypes.length === 0) {
    return locations;
  }

  const map = locationTypes.reduce<Record<string, string>>((acc, item) => {
    if (item?.slug && item?.type) {
      acc[item.slug] = item.type;
    }
    return acc;
  }, {});

  return locations.map((location) => ({
    ...location,
    locationType:
      map[location.locationType] ?? location.locationType ?? "Локація",
  }));
}