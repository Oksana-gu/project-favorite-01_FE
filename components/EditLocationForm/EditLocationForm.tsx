"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LocationForm, {
  type LocationFormValues,
} from "@/components/LocationForm/LocationForm";
import { updateLocation } from "@/lib/api/locations";
import { getLocationErrorMessage } from "@/lib/api/errors";

interface EditLocationFormProps {
  locationId: string;
  initialValues: LocationFormValues;
  initialImageUrl: string;
}

export default function EditLocationForm({
  locationId,
  initialValues,
  initialImageUrl,
}: EditLocationFormProps) {
  const router = useRouter();

  // TODO: перевірити після мерджа PATCH /api/locations/:id на бекенді
  const handleSubmit = async (formData: FormData) => {
    try {
      await updateLocation(locationId, formData);
      router.push(`/locations/${locationId}`);
    } catch (error) {
      toast.error(getLocationErrorMessage(error, "edit"));
    }
  };

  return (
    <LocationForm
      mode="edit"
      initialValues={initialValues}
      initialImageUrl={initialImageUrl}
      onSubmit={handleSubmit}
    />
  );
}
