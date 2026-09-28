import type { Metadata } from "next";
import CreateLocationForm from "@/components/CreateLocationForm/CreateLocationForm";
import css from "@/app/locations/LocationFormPage.module.css";

export const metadata: Metadata = {
  title: "Додавання нового місця",
  description: "Поділіться новим місцем для відпочинку в Україні",
};

export default function CreateLocationPage() {
  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Додавання нового місця</h1>
        <CreateLocationForm />
      </div>
    </main>
  );
}
