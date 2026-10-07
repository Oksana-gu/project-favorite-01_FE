import { AddReviewModal } from "@/components/AddReviewModal/AddReviewModal";

interface ReviewPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { locationId } = await params;

  return <AddReviewModal locationId={locationId} />;
}
