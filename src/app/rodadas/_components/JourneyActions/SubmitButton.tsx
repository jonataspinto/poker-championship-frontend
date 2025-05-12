"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="text-white">
      {pending ? "Carregando..." : "Salvar"}
    </button>
  );
}
