import ReviewsBlock from "./ReviewsBlock";
import { getAllLocations } from "@/utils/getAllLocations";
import { getAllFeedbacksSorted } from "@/lib/feedbacks";
import getFeedbackWithLocationName from "@/utils/getFeedbackWithLocationName";
import type { FeedbackWithLocation } from "@/types/feedbacks";

export const revalidate = 60;

export default async function FeedbacksSection() {
  let normalizedFeedbacks: FeedbackWithLocation[] = [];

  try {
    const locations = await getAllLocations();
    const feedbacks = await getAllFeedbacksSorted(locations);
    normalizedFeedbacks = getFeedbackWithLocationName(
      feedbacks || [],
      locations || []
    );
  } catch (error) {
    console.error("Помилка завантаження відгуків:", error);
  }

  return <ReviewsBlock feedbacks={normalizedFeedbacks} />;
}