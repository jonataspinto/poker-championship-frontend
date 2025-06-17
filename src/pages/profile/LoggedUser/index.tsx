import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { UserData } from "./UserData";

export async function LoggedUser({
  className,
  ...rest
}: ComponentProps<"section">) {
  return (
    <section
      className={twMerge(["flex flex-col gap-4 items-center pb-4", className])}
      {...rest}
    >
      <UserData />
    </section>
  );
}
