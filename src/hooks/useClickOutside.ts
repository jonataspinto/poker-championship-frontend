"use client";

import { RefObject, useEffect } from "react";

export const useClickOutside = <T = HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void,
  dependencies: unknown[] = []
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const doesNotContainClickedEl = !(ref.current as HTMLElement)?.contains(
        event.target as Node
      );

      if (doesNotContainClickedEl) {
        onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, dependencies);
};
