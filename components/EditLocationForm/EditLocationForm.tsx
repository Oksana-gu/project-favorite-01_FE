"use client";

import LocationForm, {
  type LocationFormValues,
} from "@/components/LocationForm/LocationForm";
import { simulateRequest } from "@/lib/mocks/simulateRequest";

interface EditLocationFormProps {
  initialValues: LocationFormValues;
  initialImageUrl: string;
}

export default function EditLocationForm({
  initialValues,
  initialImageUrl,
}: EditLocationFormProps) {
  // TODO: інтеграція з app/api/locations (PATCH formData, редірект на сторінку локації)
  const handleSubmit = async () => {
    await simulateRequest();
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
