import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function PageContainer({ className, ...rest }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(["container mx-auto px-4 py-8 max-w-2xl", className])}
      {...rest}
    />
  );
}
