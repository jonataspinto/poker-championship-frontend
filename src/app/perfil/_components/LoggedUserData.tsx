import { auth } from "@/auth";
import { Avatar } from "@/components";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function HighlightNumberCard({
  highlight = "",
  description = ""
}: {
  highlight?: string | number;
  description?: string | number;
}) {
  return (
    <div className="rounded-lg border border-[#3D4D5C] flex flex-col items-center justify-center p-3">
      <span className="text-3xl font-bold text-foreground">{highlight}</span>
      <span className="text-sm text-[#9EADBF]">{description}</span>
    </div>
  );
}

async function UserData() {
  const session = await auth();
  const playerId = session?.user?.id;
  let journeys: JourneyDTO[] = [];

  try {
    if (playerId) {
      const searchParams = new URLSearchParams({ playerId });
      const { listJourneys } = await import("@/services/actions");
      journeys = await listJourneys(searchParams);
    }
  } catch (error) {
    console.error("Error fetching journeys:", error);
  }

  const victories = journeys.reduce((count, journey) => {
    return count + (journey?.podium?.first === playerId ? 1 : 0);
  }, 0);

  const playedJourneys = journeys.length;

  const average = victories / playedJourneys;

  const averageFinal = !isNaN(average) ? average.toFixed(2) : "0.00";

  return (
    <>
      <div className="relative flex justify-center items-center w-[128px] h-[128px] p-1 bg-foreground rounded-full">
        <Avatar
          width={125}
          height={125}
          className="rounded-full"
          src={session?.user?.photoURL || ""}
          alt={session?.user?.name || "User Avatar"}
          title={session?.user?.name || "User"}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center">
          {session?.user?.name || "User"}
        </h2>
        <p className="text-[#9EADBF] text-center">
          {session?.user?.email || "Email"}
        </p>
      </div>

      <div className="w-full grid grid-cols-3 gap-3 py-3">
        <HighlightNumberCard highlight={playedJourneys} description="Jogos" />
        <HighlightNumberCard highlight={victories} description="Vitórias" />
        <HighlightNumberCard highlight={averageFinal} description="Avg final" />
      </div>
    </>
  );
}

export async function LoggedUserData({
  className,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section
      className={twMerge(["flex flex-col gap-4 items-center pb-4", className])}
      {...rest}
    >
      <UserData />
    </section>
  );
}
