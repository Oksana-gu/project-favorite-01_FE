"use client";

import LocationForm from "@/components/LocationForm/LocationForm";
import { simulateRequest } from "@/lib/mocks/simulateRequest";

export default function CreateLocationForm() {
  // TODO: інтеграція з app/api/locations (POST formData, редірект на сторінку нової локації)
  const handleSubmit = async () => {
    await simulateRequest();
  };

  return <LocationForm mode="create" onSubmit={handleSubmit} />;
}
