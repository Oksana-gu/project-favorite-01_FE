"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AppButton } from "@/components/Ui/Button/Button";
import { Icon } from "@/components/Ui/Icon/Icon";
import css from "./ReviewsBlock.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { FeedbackWithLocation } from "@/types/feedbacks";
import ReviewsCard from "./ReviewsCard/ReviewsCard";

interface ReviewsBlockProps {
  feedbacks: FeedbackWithLocation[];
}

export default function ReviewsBlock({ feedbacks }: ReviewsBlockProps) {
  const hasReviews = Array.isArray(feedbacks) && feedbacks.length > 0;

  return (
    <section className={css.reviewsSection}>
      <div className={css.container}>
        <div className={css.reviewsHeader}>
          <h2 className={css.reviewsHeaderTitle}>Останні відгуки</h2>
        </div>

        {!hasReviews ? (
          <p className={css.noReviews}>Відгуків поки немає</p>
        ) : (
          <>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.${css.btnPrev}`,
                nextEl: `.${css.btnNext}`,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                375: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
              className={css.swiper}
            >
              {feedbacks.map((feedback) => (
                <SwiperSlide key={feedback._id} className={css.swiperSlide}>
                  <ReviewsCard feedback={feedback} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={css.navigation}>
              <AppButton
                className={css.btnPrev}
                variant="secondary"
                ariaLabel="Previous"
              >
                <Icon className={css.iconPrev} name="arrow_back" />
              </AppButton>
              <AppButton
                className={css.btnNext}
                variant="secondary"
                ariaLabel="Next"
              >
                <Icon className={css.iconNext} name="arrow_forward" />
              </AppButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}