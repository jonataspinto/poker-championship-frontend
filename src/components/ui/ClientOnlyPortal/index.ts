"use client";

import { useRef, useEffect, useState, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export type ClientOnlyPortalProps = {
  selector: string;
};

export function ClientOnlyPortal({
  children,
  selector
}: PropsWithChildren<ClientOnlyPortalProps>) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(selector);
    setMounted(true);

    return () => setMounted(false);
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
