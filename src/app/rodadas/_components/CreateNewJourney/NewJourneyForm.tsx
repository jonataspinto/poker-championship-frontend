"use client";

import { ComponentProps, useTransition } from "react";
import { createJourney, revalidateListJourneys } from "@/services/actions";
import { Avatar, Spinner, toast } from "@/components";
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full relative"
    >
      <h2 className="font-bold text-2xl sticky top-0 bg-zinc-800 z-10 pb-2">
        Selecione os jogadores
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {players.map((player) => (
          <div key={player.id} className="inline-flex">
            <input
              type="checkbox"
              id={player.id}
              name={`players-${player.id}`}
              value={player.id}
              className="hidden peer"
            />
            <label
              htmlFor={player.id}
              className="inline-flex gap-4 w-full p-4 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="relative rounded-full overflow-hidden bg-gray-200 min-w-[70px] h-[70px] flex items-center justify-center">
                <Avatar
                  fill
                  src={player.photoURL || ""}
                  alt={player.name}
                  title={player.name}
                  className="object-cover w-full"
                />
              </div>
              <div className="inline-grid h-fit gap-1">
                <h3
                  className="w-full text-lg font-semibold capitalize truncate"
                  title={player?.name}
                >
                  {player?.name}
                </h3>
                <p className="w-full text-sm truncate" title={player.email}>
                  {player?.email}
                </p>
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
