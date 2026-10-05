"use client";

import css from "./error.module.css";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <section className={css.wrapper}>
      <h1 className={css.title}>Something went wrong...</h1>
      <p className={css.message}>{error.message}</p>
    </section>
  );
}
