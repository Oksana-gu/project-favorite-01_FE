import type { Metadata } from "next";
import EditLocationForm from "@/components/EditLocationForm/EditLocationForm";
import css from "@/app/locations/LocationFormPage.module.css";

export const metadata: Metadata = {
  title: "Редагування місця",
  description: "Редагування інформації про місце для відпочинку",
};

// TODO: fetch the location by locationId instead of this mock (location from the DB dump)
const MOCK_LOCATION = {
  name: "Пилипець: Боржавські Схили",
  type: "hirskolyzhnyi-kurort",
  region: "zakarpattya",
  description:
    "Пилипець — це мальовниче закарпатське село, що розкинулось біля підніжжя велетенської полонини Боржава. Це місце приваблює туристів цілий рік, але справжньою меккою воно стає взимку. Головна перевага Пилипця — це найдовші в Україні гірськолижні траси, що спускаються з вершин гір Гимба та Жид-Магура.",
  image: "https://ftp.goit.study/img/relax-map/68d568270e6bcc357e983422.webp",
};

export default function EditLocationPage() {
  const { image, ...initialValues } = MOCK_LOCATION;

  return (
    <main className={css.page}>
      <div className={css.container}>
        <h1 className={css.title}>Редагування місця</h1>
        <EditLocationForm initialValues={initialValues} initialImageUrl={image} />
      </div>
    </main>
  );
}
