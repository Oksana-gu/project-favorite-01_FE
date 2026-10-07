import { AddReviewModal } from "@/components/AddReviewModal/AddReviewModal";

interface ReviewModalPageProps {
  params: Promise<{
    locationId: string;
  }>;
}

export default async function ReviewModalPage({
  params,
}: ReviewModalPageProps) {
  const { locationId } = await params;

  return <AddReviewModal locationId={locationId} />;
}
