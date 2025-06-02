"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { signOut } from "next-auth/react";

export function LogoutButton({
  className,
  onClick,
  ...restProps
}: ComponentProps<"button">) {
  function handleSignOut(event: React.MouseEvent<HTMLButtonElement>) {
    signOut();
    onClick?.(event);
  }

  return (
    <button
      className={twMerge("btn-light flex gap-2 items-center", className)}
      onClick={handleSignOut}
      {...restProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
        />
      </svg>
      Sair
    </button>
  );
}
