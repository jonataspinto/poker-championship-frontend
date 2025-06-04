import { Ranking } from "@/components/_modules/Ranking";
import { MyResults } from "@/components/_modules/MyResults";
import { LastJourney } from "@/components/_modules/LastJourney";

export const metadata = {
  title: "Poker Championship",
  description: "A Next.js application for managing poker championships"
};

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 home-grid-areas md:gap-8">
      <Ranking className="home-grid-area__ranking" />
      <MyResults className="max-md:mt-8 home-grid-area__my-results" />
      <LastJourney className="max-md:mt-8 home-grid-area__last-journey" />
    </div>
  );
}
