"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function GoBackButton() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center w-fit min-w-fit !p-0"
    >
      <span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span>Voltar</span>
    </button>
  );
}
