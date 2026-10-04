import type { LocationDetails } from "@/types/location";

import LocationInfoBlock from "@/components/LocationInfoBlock/LocationInfoBlock";
import LocationGallery from "@/components/LocationGallery/LocationGallery";
import LocationDescription from "@/components/LocationDescription/LocationDescription";
import ReviewsSection from "@/components/ReviewsSection/ReviewsSection";

import css from "./LocationDetailsPage.module.css";

interface LocationDetailsPageProps {
  location: LocationDetails;
}

export default function LocationDetailsPage({
  location,
}: LocationDetailsPageProps) {
   console.log("LOCATION DATA:", location);

  return (
    <main className={css.page}>
      <div className={css.container}>
        <div className={css.hero}>
          <div className={css.info}>
            <LocationInfoBlock location={location} />
          </div>

          <div className={css.gallery}>
            <LocationGallery
              image={location.image ?? "/images/placeholder.jpg"}
              name={location.name}
            />
          </div>
        </div>

        <LocationDescription
          description={location.description ?? ""}
        />

        <ReviewsSection locationId={location._id} />
      </div>
    </main>
  );
}