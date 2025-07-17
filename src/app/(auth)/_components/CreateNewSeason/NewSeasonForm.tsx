"use client";

import { ComponentProps, useActionState } from "react";
import { Spinner, toast } from "@/components";
import { SEASON_ACTIONS_EVENT_KEY, seasonActionsEventManager } from "@/utils";
import { createSeason } from "@/services/actions";

export function NewSeasonForm({}: ComponentProps<"form"> & {}) {
  const [, dispatchAction, isPending] = useActionState(
    async (previousValue: Record<string, string>, formData: FormData) => {
      try {
        const title = formData.get("title") as string;

        await createSeason({
          title
        });

        toast({
          type: "success",
          text: "Temporada iniciada com sucesso"
        });

        seasonActionsEventManager.emit(SEASON_ACTIONS_EVENT_KEY.CREATE, {
          detail: {
            success: true
          }
        });
      } catch (error) {
        toast({
          type: "danger",
          text: "Erro ao criar nova temporada"
        });
        console.error(error);
      }
      return previousValue;
    },
    {}
  );

  return (
    <form
      action={dispatchAction}
      className="flex flex-col gap-4 w-full relative max-h-[70vh]"
    >
      <h2 className="font-bold text-2xl sticky top-0 bg-zinc-800 z-10 pb-2">
        Nome da temporada
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <input
          type="text"
          name="title"
          placeholder="Digite o nome da temporada"
          className="input-primary w-full"
          required
        />
      </div>

      <button type="submit" className="btn-primary">
        {isPending ? <Spinner /> : "Iniciar nova temporada"}
      </button>
    </form>
  );
}
