import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Overlay({ className, ...restProps }: ComponentProps<"div">) {
  return (
    <div
      className={twMerge([
        "fixed top-0 left-0 w-full h-full z-[200]",
        "flex items-center justify-center",
        "bg-black/40 animate-fadeIn",
        className
      ])}
      {...restProps}
    />
  );
}
