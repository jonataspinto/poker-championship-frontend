"use client";

import { useTransition } from "react";
import { revalidateListJourneys, updateJourney } from "@/services/actions";
import { Divider, Spinner, toast } from "@/components";
import { JOURNEY_ACTIONS_EVENT_KEY, journeyActionsEventManager } from "@/utils";
import { SelectPlayersField } from "./SelectPlayersField";

function validateValue(value: string) {
  return value && !value.includes("Selecione") ? value : "";
}

function mapper(formData: FormData) {
  const podiumMap = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: ""
  };

  Object.keys(podiumMap).forEach((key: string) => {
    const value = formData.get(key) as string;

    podiumMap[key as keyof typeof podiumMap] = validateValue(value);
  });

  return podiumMap;
}

export function JourneyPodiumForm({
  journey,
  players
}: {
  journey: JourneyDTO;
  players: Map<string, PlayerDTO>;
}) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const formData = new FormData(event.currentTarget);
    const bestHand = validateValue(formData.get("bestHand") as string);
    const biggestEliminator = validateValue(
      formData.get("biggestEliminator") as string
    );
    const podium: Podium = mapper(formData);

    const payload: Partial<Journey> = {
      bestHand,
      biggestEliminator,
      podium
    };

    startTransition(async () => {
      try {
        await updateJourney(journey.id, payload);

        toast({
          type: "success",
          text: "Rodada atualizada com sucesso"
        });

        revalidateListJourneys();

        journeyActionsEventManager.emit(JOURNEY_ACTIONS_EVENT_KEY.UPDATE, {
          detail: {
            success: true
          }
        });
      } catch (error) {
        toast({
          type: "danger",
          text: "Erro ao atualizar a rodada"
        });
        console.error(error);
      }
    });
  }

  return (
    <form className="flex flex-col gap-4 w-full h-full" onSubmit={handleSubmit}>
      <SelectPlayersField
        name="first"
        label="Primeiro lugar"
        players={players}
        defaultValue={journey?.podium?.first}
      />
      <SelectPlayersField
        name="second"
        label="Segundo lugar"
        players={players}
        defaultValue={journey?.podium?.second}
      />
      <SelectPlayersField
        name="third"
        label="Terceiro lugar"
        players={players}
        defaultValue={journey?.podium?.third}
      />
      <SelectPlayersField
        name="fourth"
        label="Quarto lugar"
        players={players}
        defaultValue={journey?.podium?.fourth}
      />
      <SelectPlayersField
        name="fifth"
        label="Quinto lugar"
        players={players}
        defaultValue={journey?.podium?.fifth}
      />
      <Divider className="w-[80%] mx-auto mt-4 bg-gray-500" />
      <SelectPlayersField
        name="bestHand"
        label="Melhor mão"
        players={players}
        defaultValue={journey?.bestHand}
      />
      <SelectPlayersField
        players={players}
        label="Maior eliminador"
        name="biggestEliminator"
        className="mb-auto"
        defaultValue={journey?.biggestEliminator}
      />
      <button disabled={isPending} type="submit" className="btn-primary mt-8">
        {isPending ? <Spinner /> : "Salvar"}
      </button>
    </form>
  );
}
