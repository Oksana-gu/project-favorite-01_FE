import PopularLocationsBlock from "./PopularLocationsBlock";
import { getAllLocations } from "@/utils/getAllLocations";
import { getLocationTypes } from "@/lib/locationsApi";
import { normalizeLocationsByType } from "@/utils/getLocationsWithNormalizedTypes";

export default async function PopularSection() {
  try {
    const [locations, locationTypes] = await Promise.all([
      getAllLocations(),
      getLocationTypes(),
    ]);

    const normalizedLocations = normalizeLocationsByType(
      locations || [],
      locationTypes || []
    );

    return <PopularLocationsBlock locations={normalizedLocations} />;
  } catch (error) {
    console.error("Помилка завантаження популярних локацій:", error);
    return <PopularLocationsBlock locations={[]} />;
  }
}