"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LocationForm from "@/components/LocationForm/LocationForm";
import { createLocation } from "@/lib/api/locations";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function CreateLocationForm() {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const { _id } = await createLocation(formData);
      router.push(`/locations/${_id}`);
    } catch (error) {
      toast.error(
        getApiErrorMessage(
          error,
          "Не вдалося опублікувати місце. Спробуйте ще раз",
        ),
      );
    }
  };

  return <LocationForm mode="create" onSubmit={handleSubmit} />;
}
