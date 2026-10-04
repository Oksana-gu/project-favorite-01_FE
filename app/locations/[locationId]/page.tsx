import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationDetailsPage from "./LocationDetailsPage";
import type { Location } from "@/types/location";

interface LocationPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

const mockLocation: Location = {
  _id: "1",
  name: "Бакотська затока",
  region: "Хмельниччина",
  type: "Пляж",
  description:
    "Бакотська затока — це справжня перлина Поділля, яку часто називають українською Атлантидою. Розташована на річці Дністер, вона вражає своїми масштабами та неймовірними панорамними краєвидами, що відкриваються з високих скелястих берегів. Це місце з унікальною енергетикою, де поєднуються тиша, велич природи та багата історія затопленого села Бакота.\n\nТут можна насолодитися неспішними прогулянками вздовж берега, влаштувати пікнік з видом на затоку або вирушити на водну прогулянку на човні чи каяку. Завдяки унікальному мікроклімату, схожому на ялтинський, це місце ідеально підходить для відпочинку з наметами. Поруч знаходиться скельний монастир, що додає локації історичної та духовної цінності. Бакота - це ідальний вибір для тих, хто шукає спокою, єднання з природою та незабутніх вражень.",
  image: "/images/content.jpg",    

  owner: {
    _id: "1",
    name: "Анастасія Олійник",
  },
};
export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { locationId } = await params;

  const location =
    locationId === mockLocation._id ? mockLocation : null;

  if (!location) {
    return {
      title: "Локацію не знайдено",
    };
  }

  return {
    title: `${location.name} | RelaxMap`,
    description: location.description.slice(0, 160),
    openGraph: {
      title: location.name,
      description: location.description.slice(0, 160),
      images: [
        {
          url: location.image,
          alt: location.name,
        },
      ],
    },
  };
}

export default async function LocationPage({
  params,
}: LocationPageProps) {
  const { locationId } = await params;

  const location =
    locationId === mockLocation._id ? mockLocation : null;

  if (!location) {
    notFound();
  }

  return <LocationDetailsPage location={location} />;
}