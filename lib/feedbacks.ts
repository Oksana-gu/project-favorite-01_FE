import axios from "axios";
import { Feedback, FeedbacksResponse } from "@/types/feedbacks";
import type { Location } from "@/types/profile";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.your-domain.com";

const publicApi = axios.create({
  baseURL: API_BASE_URL,
});

const privateApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export interface AddFeedbackPayload {
  locationId: string;
  rate: number;
  description: string;
}

export async function getFeedbacks(
  locationId?: string,
  page = 1,
  perPage = 10,
): Promise<FeedbacksResponse> {
  const { data } = await publicApi.get<FeedbacksResponse>("/feedbacks", {
    params: { locationId, page, perPage },
  });

  return data;
}

export async function getAllFeedbacksSorted(
  locations: Location[],
): Promise<Feedback[]> {
  if (!locations || locations.length === 0) {
    return [];
  }

  const locationsWithFeedbacks = locations.filter(
    (loc) => loc.feedbacksId && loc.feedbacksId.length > 0,
  );

  const results = await Promise.allSettled(
    locationsWithFeedbacks.map((loc) =>
      getFeedbacks(loc._id, 1, loc.feedbacksId!.length),
    ),
  );

  const allFeedbacks: Feedback[] = results.flatMap((result) =>
    result.status === "fulfilled" && result.value?.feedbacks
      ? result.value.feedbacks
      : [],
  );

  return allFeedbacks.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });
}

export async function addFeedback(
  payload: AddFeedbackPayload,
): Promise<Feedback> {
  const { data } = await privateApi.post<Feedback>("/feedbacks", payload);

  return data;
}
