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
      <button
        type="button"
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick={toggle}
      >
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>

        <svg
          className="block size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <svg
          className="hidden size-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>

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
