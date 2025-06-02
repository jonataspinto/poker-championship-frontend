import { Suspense } from "react";
import { Ranking } from "@/components/_modules/Ranking";

export const metadata = {
  title: "Poker Championship",
  description: "A Next.js application for managing poker championships"
};

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-8 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <section className="bg-gray-800 p-8 rounded h-full">
            <h1 className="text-3xl font-bold mb-4">Meus resultados</h1>
            {/* Example my data */}
            <div className="rounded">
              <p className="text-lg">Total Wins: 5</p>
              <p className="text-lg">Total Rounds Played: 10</p>
              <p className="text-lg">Best Hand: Royal Flush</p>
            </div>
          </section>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <section className="bg-gray-800 p-8 rounded h-full">
            <h1 className="text-3xl font-bold mb-4">Última rodada</h1>
            {/* Example details for the last journey */}
            <div className="rounded">
              <p className="text-lg font-semibold">Date: 2024-06-10</p>
              <p className="text-lg">Winner: John Doe</p>
              <p className="text-lg">Buy-ins: 10</p>
              <p className="text-lg">Total Pot: $500</p>
            </div>
          </section>
        </Suspense>
      </div>

      <section className="relative overflow-x-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Ranking />
        </Suspense>
      </section>
    </div>
  );
}
