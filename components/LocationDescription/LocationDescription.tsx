import css from "./LocationDescription.module.css";

interface LocationDescriptionProps {
  description: string;
}

export default function LocationDescription({
  description,
}: LocationDescriptionProps) {
  const paragraphs = description.split("\n\n");

  return (
    <section className={css.section}>
      {paragraphs.map((paragraph, index) => (
        <p className={css.text} key={index}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}