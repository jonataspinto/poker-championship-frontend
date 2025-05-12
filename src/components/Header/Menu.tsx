"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useAnimatedUnmount, useToggle } from "@/hooks";
import { Dialog } from "../Dialog";

export function Menu() {
  const [isOpen, toggle] = useToggle(false);
  const { animatedElementRef, shouldRender } =
    useAnimatedUnmount<HTMLDivElement>(isOpen);

  return (
    <>
      <button onClick={toggle}>Menu</button>

      {shouldRender && (
        <Dialog.Root selector="#menu">
          <Dialog.Container
            ref={animatedElementRef}
            className={twMerge([
              isOpen && "animate-appearsFromRight",
              !isOpen && "animate-outLeft",
              "max-h-full h-screen",
              "lg:col-start-1 lg:col-end-5",
              "max-lg:rounded-none lg:rounded-br-2xl lg:rounded-tr-2xl lg:rounded-bl-none lg:rounded-tl-none"
            ])}
          >
            <Dialog.Header className="justify-end">
              <Dialog.CloseButton
                onClick={toggle}
                className="px-4 py-2 text-black border  border-solid rounded"
              >
                X
              </Dialog.CloseButton>
            </Dialog.Header>
            <Dialog.Content className="items-start">
              <Link href="/" className="text-black border-b border-solid">
                Home
              </Link>
              <Link href="/login" className="text-black border-b border-solid">
                Login
              </Link>
              <Link
                href="/rodadas"
                className="text-black border-b border-solid"
              >
                Rodadas
              </Link>
            </Dialog.Content>
          </Dialog.Container>
        </Dialog.Root>
      )}
    </>
  );
}
