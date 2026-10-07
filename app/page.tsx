import { Suspense } from "react";
import HeroBlock from "@/components/Home/HeroBlock/HeroBlock";
import AdvantagesBlock from "@/components/Home/AdvantagesBlock/AdvantagesBlock";
import PopularSection from "@/components/Home/PopularLocationsBlock/PopularSection";
import FeedbacksSection from "@/components/Home/ReviewsBlock/FeedbacksSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <HeroBlock />
      <AdvantagesBlock />

      <Suspense fallback={<p>Завантаження популярних локацій...</p>}>
        <PopularSection />
      </Suspense>

      <Suspense fallback={<p>Завантаження відгуків...</p>}>
        <FeedbacksSection />
      </Suspense>
    </main>
  );
}