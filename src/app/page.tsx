import { PageContainer } from "@/components";
import { Ranking } from "@/pages/home/Ranking";
import { MyResults } from "@/pages/home/MyResults";
import { LastJourney } from "@/pages/home/LastJourney";

export const metadata = {
  title: "Poker Championship",
  description: "A Next.js application for managing poker championships"
};

export default function Home() {
  return (
    <PageContainer className="home-grid-areas md:gap-8">
      <Ranking className="home-grid-area__ranking" />
      <MyResults className="max-md:mt-8 home-grid-area__my-results" />
      <LastJourney className="max-md:mt-8 home-grid-area__last-journey" />
    </PageContainer>
  );
}
