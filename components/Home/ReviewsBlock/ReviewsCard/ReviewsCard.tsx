import { Stars } from "@/components/Ui/Stars";
import css from "./ReviewsCard.module.css";
import { FeedbackWithLocation } from "@/types/feedbacks";

interface ReviewsCardProps {
  feedback: FeedbackWithLocation;
}

export default function ReviewsCard({ feedback }: ReviewsCardProps) {
  const rate = feedback.rate ?? 0;

  return (
    <div className={css.reviewsCardWrapper}>
      <div className={css.reviewsStarsWrapper}>
        <Stars rate={rate} />
      </div>

      <p className={css.reviewsCardDescription}>{feedback.description}</p>
      <p className={css.reviewsCardAuthor}>{feedback.userName}</p>
      <p className={css.reviewsCardLocation}>
        {feedback.locationName ?? "Невідома локація"}
      </p>
    </div>
  );
}