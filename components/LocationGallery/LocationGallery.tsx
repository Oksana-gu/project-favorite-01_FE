import Image from "next/image";
import css from "./LocationGallery.module.css";

interface LocationGalleryProps {
  image: string;
  name: string;
}

export default function LocationGallery({
  name,
}: LocationGalleryProps) {
  return (
    <div className={css.gallery}>
      <Image
        src="/images/Content.jpg"
        alt={name}
        fill
        priority
        sizes="(min-width: 1440px) 592px, (min-width: 768px) 704px, 100vw"
        className={css.image}
      />
    </div>
  );
}