"use client";

import { useState } from "react";
import css from "./ReviewsSection.module.css";

interface ReviewsSectionProps {
  locationId: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
}

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Олена Коваль",
    rating: 5,
    text: "Неймовірні краєвиди та спокійна атмосфера — це одне з моїх найулюбленіших місць в Україні.",
  },
  {
    id: "2",
    author: "Ігор Петров",
    rating: 5,
    text: "Чудове місце для відпочинку на природі: чисте повітря, мальовничі пагорби та спокійна річка.",
  },
  {
    id: "3",
    author: "Ігор Шевченко",
    rating: 5,
    text: "Тут відчуваєш гармонію та справжню силу української природи — варто приїхати хоча б раз у житті.",
  },
  {
    id: "4",
    author: "Марія Бондар",
    rating: 4,
    text: "Дуже красиве та атмосферне місце. Особливо сподобалися краєвиди на Дністер.",
  },
];

export default function ReviewsSection({
  locationId,
}: ReviewsSectionProps) {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevious = () => {
    setStartIndex((prev) =>
      prev === 0 ? mockReviews.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev === mockReviews.length - 1 ? 0 : prev + 1,
    );
  };

  const handleAddReview = () => {
    // TODO:
    // неавторизований -> AuthPromptModal
    // авторизований -> AddReviewModal

    console.log("Add review:", locationId);
  };

  const orderedReviews = [
    ...mockReviews.slice(startIndex),
    ...mockReviews.slice(0, startIndex),
  ];

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>Відгуки</h2>

        <button
          type="button"
          className={css.addButton}
          onClick={handleAddReview}
        >
          Залишити відгук
        </button>
      </div>

      <div className={css.list}>
        {orderedReviews.slice(0, 3).map((review) => (
          <article className={css.card} key={review.id}>
            <div
              className={css.stars}
              aria-label={`Оцінка ${review.rating} з 5`}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p className={css.reviewText}>
              {review.text}
            </p>

            <p className={css.author}>
              {review.author}
            </p>
          </article>
        ))}
      </div>

      <div className={css.navigation}>
        <button
          type="button"
          className={css.arrow}
          onClick={handlePrevious}
          aria-label="Попередні відгуки"
        >
          ←
        </button>

        <button
          type="button"
          className={css.arrow}
          onClick={handleNext}
          aria-label="Наступні відгуки"
        >
          →
        </button>
      </div>
    </section>
  );
}