"use client";

import { useTransition } from "react";
import { Spinner, toast } from "@/components";
import { revalidateListJourneys } from "@/services/actions";

function isValidToClose(journey: JourneyDTO) {
  const assertions = [
    !!journey?.bestHand,
    !!journey?.biggestEliminator,
    !!journey?.podium?.first,
    !!journey?.podium?.second
  ];

  return assertions.every((assertion) => assertion === true);
}

export function CloseJourney({
  journey,
  action
}: {
  journey: JourneyDTO;
  action: (id: string) => Promise<JourneyDTO>;
}) {
  const isValid = isValidToClose(journey);
  const [isPending, startTransition] = useTransition();

  function handleClose() {
    startTransition(async () => {
      try {
        await action(journey?.id);

        toast({
          type: "success",
          text: "Rodada encerrada!"
        });
        revalidateListJourneys();
      } catch (error) {
        toast({
          type: "danger",
          text: "Erro ao encerrar a rodada"
        });
        console.error(error);
      }
    });
  }

  return (
    <button onClick={handleClose} className="btn-light" disabled={!isValid}>
      {!isPending ? "Encerrar" : <Spinner />}
    </button>
  );
}
