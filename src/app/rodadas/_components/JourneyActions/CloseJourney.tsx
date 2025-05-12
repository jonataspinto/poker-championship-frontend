"use client";

import { useTransition } from "react";
import { Spinner } from "@/components";

export function CloseJourney({
  journey,
  action
}: {
  journey: JourneyDTO;
  action: (id: string) => Promise<JourneyDTO>;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClose() {
    startTransition(async () => {
      try {
        await action(journey?.id);
      } catch (error) {
        console.error("Error closing journey:", error);
      }
    });
  }

  return (
    <button onClick={handleClose} className="btn-light">
      {!isPending ? "Encerrar" : <Spinner />}
    </button>
  );
}
