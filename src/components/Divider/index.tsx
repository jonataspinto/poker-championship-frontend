import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

export function Divider({
  className,
  ...restProps
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={twMerge([
        "block p-0 m-0 w-full min-w-0 h-[1px] bg-white",
        className
      ])}
      {...restProps}
    />
  );
}
