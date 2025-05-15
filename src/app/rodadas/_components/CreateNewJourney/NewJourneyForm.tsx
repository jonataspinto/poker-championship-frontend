"use client";

import { ComponentProps, useTransition } from "react";
import { createJourney, revalidateListJourneys } from "@/services/actions";
import { Spinner, toast } from "@/components";
import {
  JOURNEY_ACTIONS_EVENT_KEY,
  journeyActionsEventManager
} from "../journeyActionsEventManager";

export function NewJourneyForm({
  players,
  seasonId
}: ComponentProps<"form"> & {
  players: PlayerDTO[];
  seasonId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const players = Array.from(formData.values()) as string[];

    startTransition(async () => {
      try {
        await createJourney({ seasonId, players });

        toast({
          type: "success",
          text: "Rodada criada com sucesso"
        });

        journeyActionsEventManager.emit(JOURNEY_ACTIONS_EVENT_KEY.CREATE, {
          detail: {
            success: true
          }
        });

        revalidateListJourneys();
      } catch (error) {
        toast({
          type: "danger",
          text: "Erro ao criar nova rodada"
        });
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <h2>Selecione os jogadores</h2>
      <div className="flex flex-col grid-cols-1 gap-4 sm:grid-cols-2">
        {players.map((player) => (
          <div key={player.id}>
            <input
              type="checkbox"
              id={player.id}
              name={`players-${player.id}`}
              value={player.id}
              className="hidden peer"
            />
            <label
              htmlFor={player.id}
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="block">
                {/* TODO: Add player image */}
                <div className="w-full text-lg font-semibold">
                  {player?.name}
                </div>
                <div className="w-full text-sm">{player?.email}</div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <button type="submit" className="btn-primary">
        {isPending ? <Spinner /> : "Iniciar nova rodada"}
      </button>
    </form>
  );
}
