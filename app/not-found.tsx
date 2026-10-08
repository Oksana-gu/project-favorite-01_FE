import type { Metadata } from "next";
import css from "@/app/not-found.module.css";
import { AppLink } from "@/components/Ui/Button/Button";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | RelaxMap",
  description: "Сторінка, яку ви шукаєте, не існує або була переміщена.",
  openGraph: {
    title: "Сторінку не знайдено | RelaxMap",
    description: "Сторінка, яку ви шукаєте, не існує або була переміщена.",
  },
};

export default function NotFound() {
  return (
    <section className={css.wrapper}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>
        Сторінку не знайдено. Можливо, її видалили або адреса введена з
        помилкою.
      </p>
      <AppLink
        href="/"
        className={css.link}
        ariaLabel="Повернутися на головну сторінку"
      >
        На головну
      </AppLink>
    </section>
  );
}