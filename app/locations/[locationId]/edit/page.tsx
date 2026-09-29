import type { Metadata } from "next";
import EditLocationForm from "@/components/EditLocationForm/EditLocationForm";
import { getLocationByIdServer } from "@/lib/api/serverLocations";
import css from "@/app/locations/LocationFormPage.module.css";

interface EditLocationPageProps {
  params: Promise<{ locationId: string }>;
}

export async function generateMetadata({
  params,
}: EditLocationPageProps): Promise<Metadata> {
  const { locationId } = await params;
  const location = await getLocationByIdServer(locationId);

  return {
    title: `Редагування: ${location.name}`,
    description: `Редагування інформації про місце "${location.name}"`,
  };
}

export default async function EditLocationPage({
  params,
}: EditLocationPageProps) {
  const { locationId } = await params;
  const location = await getLocationByIdServer(locationId);

  const initialValues = {
    name: location.name,
    // TODO: узгодити назву поля з бекендом (type чи locationType)
    type: location.type,
    region: location.region,
    description: location.description,
  };

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Редагування місця</h1>
        <EditLocationForm
          initialValues={initialValues}
          initialImageUrl={location.image}
        />
      </div>
    </main>
  );
}
