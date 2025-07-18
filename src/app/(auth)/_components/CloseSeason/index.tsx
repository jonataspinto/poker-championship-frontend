"use client";

import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { Spinner, toast } from "@/components";
import { closeSeason } from "@/services/actions";

export function CloseSeason() {
  const session = useSession();
  const [isPending, startTransition] = useTransition();

  const handleCloseSeason = () => {
    startTransition(async () => {
      try {
        await closeSeason(session.data?.user.id || "");

        toast({
          type: "success",
          text: "Temporada encerrada!"
        });
      } catch (error) {
        console.log("closeSeason error:", error);

        toast({
          type: "danger",
          text: "Ops! Ocorreu um erro ao encerrar a temporada"
        });
      }
    });
  };

  return (
    <button
      type="button"
      className="btn-light"
      onClick={handleCloseSeason}
      disabled={isPending}
    >
      Encerrar temporada {isPending && <Spinner />}
    </button>
  );
}
