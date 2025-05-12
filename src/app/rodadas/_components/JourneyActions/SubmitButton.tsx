"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "@/components";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="btn-primary">
      {pending ? <Spinner /> : "Salvar"}
    </button>
  );
}
