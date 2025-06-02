"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ComponentProps, ReactNode } from "react";
import { useSession } from "next-auth/react";

import { BrandLogo, ConditionalRender, Dialog } from "@/components";
import { useAnimatedUnmount, useClickOutside } from "@/hooks";
import { LoginGoogleButton } from "./LoginGoogleButton";
import { LogoutButton } from "./LogoutButton";

function Container({
  isOpen,
  toggle,
  setToggle,
  children
}: {
  isOpen: boolean;
  toggle: () => void;
  setToggle: (value: boolean) => void;
  children?: ReactNode;
}) {
  const { animatedElementRef, shouldRender } =
    useAnimatedUnmount<HTMLDivElement>(isOpen);

  useClickOutside(animatedElementRef, () => {
    if (animatedElementRef.current) {
      setToggle(false);
    }
  });

  if (!shouldRender) {
    return null;
  }

  return (
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
        <Dialog.Header className="justify-between items-center">
          <BrandLogo onClick={toggle} />
          <Dialog.CloseButton
            onClick={toggle}
            className="btn-light px-1 py-1 border-none"
          >
            X
          </Dialog.CloseButton>
        </Dialog.Header>
        <Dialog.Content className="items-start gap-4">
          {children}
        </Dialog.Content>
      </Dialog.Container>
    </Dialog.Root>
  );
}

function Content({ toggle }: { toggle?: () => void }) {
  const { status } = useSession();

  return (
    <>
      <Link href="/" className="border-b border-solid" onClick={toggle}>
        Home
      </Link>

      <Link href="/rodadas" className="border-b border-solid" onClick={toggle}>
        Rodadas
      </Link>

      <ConditionalRender condition={status === "authenticated"}>
        <Link href="/perfil" className="border-b border-solid" onClick={toggle}>
          Perfil
        </Link>
      </ConditionalRender>

      <ConditionalRender
        condition={status === "unauthenticated"}
        fallback={<LogoutButton />}
      >
        <LoginGoogleButton />
      </ConditionalRender>
    </>
  );
}

function Button({ onClick }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={onClick}
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
  );
}

export const Drawer = {
  Button,
  Container,
  Content
};
