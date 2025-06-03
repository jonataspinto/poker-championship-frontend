import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";
import { lastJourneyPresentation } from "./lastJourneyPresentation";

export async function LastJourney({
  className,
  ...rest
}: ComponentProps<"section">) {
  const { winner, duration, participants, status } =
    await lastJourneyPresentation();

  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Última Rodada</h1>

      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId">
          <Image
            alt="Trophy icon"
            src="/icons/trophy.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="animate-fadeId">
          <p className="text-base font-semibold text-white font-sans">
            Vencedor
          </p>
          <p className="text-sm font-light text-[#9EADBF]">{winner}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId">
          <Image
            alt="Clock icon"
            src="/icons/duration.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="animate-fadeId">
          <p className="text-base font-semibold text-white font-sans">
            Duração
          </p>
          <p className="text-sm font-light text-[#9EADBF]">{duration}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId">
          <Image
            alt="Participants icon"
            src="/icons/participants.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="animate-fadeId">
          <p className="text-base font-semibold text-white font-sans">
            Participantes
          </p>
          <p className="text-sm font-light text-[#9EADBF]">{participants}</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId">
          <Image
            alt="Status icon"
            src="/icons/flag.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="animate-fadeId">
          <p className="text-base font-semibold text-white font-sans">Status</p>
          <p className="text-sm font-light text-[#9EADBF]">{status}</p>
        </div>
      </div>
    </section>
  );
}

export function LastJourneySkeleton({
  className,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Última Rodada</h1>

      <div className="flex gap-4 items-center animate-pulse">
        <div className="rounded-lg w-12 h-12 bg-gray-700"></div>
        <div>
          <p className="w-32 h-6 bg-gray-700 rounded mb-2"></p>
          <p className="w-20 h-4 bg-gray-600 rounded"></p>
        </div>
      </div>

      <div className="flex gap-4 items-center animate-pulse">
        <div className="rounded-lg w-12 h-12 bg-gray-700"></div>
        <div>
          <p className="w-32 h-6 bg-gray-700 rounded mb-2"></p>
          <p className="w-20 h-4 bg-gray-600 rounded"></p>
        </div>
      </div>

      <div className="flex gap-4 items-center animate-pulse">
        <div className="rounded-lg w-12 h-12 bg-gray-700"></div>
        <div>
          <p className="w-32 h-6 bg-gray-700 rounded mb-2"></p>
          <p className="w-20 h-4 bg-gray-600 rounded"></p>
        </div>
      </div>

      <div className="flex gap-4 items-center animate-pulse">
        <div className="rounded-lg w-12 h-12 bg-gray-700"></div>
        <div>
          <p className="w-32 h-6 bg-gray-700 rounded mb-2"></p>
          <p className="w-20 h-4 bg-gray-600 rounded"></p>
        </div>
      </div>
    </section>
  );
}
