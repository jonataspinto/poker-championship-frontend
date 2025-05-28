"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAnimatedUnmount, useClickOutside, useToggle } from "@/hooks";
import { Dialog } from "../Dialog";

export function Menu() {
  const [isOpen, toggle, setToggle] = useToggle(false);
  const { animatedElementRef, shouldRender } =
    useAnimatedUnmount<HTMLDivElement>(isOpen);

  useClickOutside(animatedElementRef, () => {
    if (animatedElementRef.current) {
      setToggle(false);
    }
  });

  const { status } = useSession();

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
              "max-lg:rounded-none lg:rounded-br-2xl lg:rounded-tr-2xl lg:rounded-bl-none lg:rounded-tl-none",
              "bg-zinc-800"
            ])}
          >
            <Dialog.Header className="justify-end">
              <Dialog.CloseButton
                onClick={toggle}
                className="btn-light px-1 py-1 border-none"
              >
                X
              </Dialog.CloseButton>
            </Dialog.Header>
            <Dialog.Content className="items-start gap-4">
              <Link href="/" className="border-b border-solid" onClick={toggle}>
                Home
              </Link>

              <Link
                href="/rodadas"
                className="border-b border-solid"
                onClick={toggle}
              >
                Rodadas
              </Link>

              <button
                className="btn-light flex gap-2 items-center"
                onClick={() => {
                  if (status === "authenticated") {
                    signOut();
                  } else {
                    signIn("google");
                  }
                }}
              >
                {status === "authenticated" ? (
                  "Sair"
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="ml-2 h-5 w-5"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.14 0 5.97 1.15 8.2 3.04l6.15-6.15C34.55 3.15 29.55 1 24 1 14.73 1 6.85 6.48 3.44 14.02l7.18 5.57C12.3 13.15 17.7 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9h12.8c-.55 2.95-2.2 5.45-4.7 7.15l7.18 5.57C43.85 37.52 46.5 31.1 46.5 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.62 28.43c-.55-1.64-.87-3.4-.87-5.43s.32-3.79.87-5.43L3.44 14.02C1.85 17.15 1 20.5 1 24s.85 6.85 2.44 9.98l7.18-5.55z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 46.5c5.55 0 10.55-2.15 14.2-5.65l-7.18-5.57c-2.05 1.3-4.7 2.07-7.02 2.07-6.3 0-11.7-3.65-14.38-8.93l-7.18 5.57C6.85 41.52 14.73 46.5 24 46.5z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                    Continuar com Google
                  </>
                )}
              </button>
            </Dialog.Content>
          </Dialog.Container>
        </Dialog.Root>
      )}
    </>
  );
}
