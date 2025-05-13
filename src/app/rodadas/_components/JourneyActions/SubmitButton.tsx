"use client";

import { useFormStatus } from "react-dom";
import { Spinner } from "@/components";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function SubmitButton(props: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={twMerge("btn-primary", props.className)}
    >
      {pending ? <Spinner /> : "Salvar"}
    </button>
  );
}
