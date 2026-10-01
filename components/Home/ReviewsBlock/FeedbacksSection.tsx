import ReviewsBlock from "./ReviewsBlock";
import { getAllLocations } from "@/utils/getAllLocations";
import { getAllFeedbacksSorted } from "@/lib/feedbacks";
import getFeedbackWithLocationName from "@/utils/getFeedbackWithLocationName";

export default async function FeedbacksSection() {
  try {
    const locations = await getAllLocations();
    const feedbacks = await getAllFeedbacksSorted(locations);
    const normalizedFeedbacks = getFeedbackWithLocationName(
      feedbacks || [],
      locations || []
    );

    return <ReviewsBlock feedbacks={normalizedFeedbacks} />;
  } catch (error) {
    console.error("Помилка завантаження відгуків:", error);
    return <ReviewsBlock feedbacks={[]} />;
  }
}