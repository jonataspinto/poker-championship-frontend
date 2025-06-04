import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { ComponentProps, Suspense } from "react";
import { auth } from "@/auth";

async function MyResultsList() {
  const session = await auth();

  return (
    <>
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
          <p className="text-base font-semibold text-white font-sans">Pódios</p>
          <p className="text-sm font-light text-[#9EADBF]">
            {session?.user?.podiums?.first} pódois
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center justify-center rounded-lg w-12 h-12 bg-gray-700 animate-fadeId">
          <Image
            alt="Points icon"
            src="/icons/points.svg"
            width={24}
            height={24}
          />
        </div>
        <div className="animate-fadeId">
          <p className="text-base font-semibold text-white font-sans">
            Total de pontos
          </p>
          <p className="text-sm font-light text-[#9EADBF]">
            {session?.user?.points} pontos
          </p>
        </div>
      </div>
    </>
  );
}

function MyResultsListSkeleton() {
  return (
    <>
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
    </>
  );
}

export function MyResults({ className, ...rest }: ComponentProps<"section">) {
  return (
    <section className={twMerge("flex flex-col gap-4", className)} {...rest}>
      <h1 className="text-2xl font-bold">Meus resultados</h1>

      <Suspense fallback={<MyResultsListSkeleton />}>
        <MyResultsList />
      </Suspense>
    </section>
  );
}
