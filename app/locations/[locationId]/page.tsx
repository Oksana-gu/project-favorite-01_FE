import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LocationDetailsPage from "./LocationDetailsPage";
import { getLocationById } from "@/lib/locationsApi";

interface LocationPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { locationId } = await params;

  try {
    const location = await getLocationById(locationId);

    return {
      title: `${location.name} | RelaxMap`,
      description: location.description?.slice(0, 160) ?? "",
      openGraph: {
        title: location.name,
        description: location.description?.slice(0, 160) ?? "",
        images: location.image
          ? [
              {
                url: location.image,
                alt: location.name,
              },
            ]
          : [],
      },
    };
  } catch {
    return {
      title: "Локацію не знайдено | RelaxMap",
    };
  }
}

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { locationId } = await params;

  let location;

  try {
    location = await getLocationById(locationId);
  } catch {
    notFound();
  }

  return <LocationDetailsPage location={location} />;
}
