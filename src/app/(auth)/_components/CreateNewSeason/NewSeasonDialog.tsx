"use client";

import { twMerge } from "tailwind-merge";
import { ComponentProps, useEffect } from "react";
import { ConditionalRender, Dialog } from "@/components";
import { useAnimatedUnmount, useClickOutside, useToggle } from "@/hooks";
import { SEASON_ACTIONS_EVENT_KEY, seasonActionsEventManager } from "@/utils";

export function NewSeasonDialog({ children }: ComponentProps<"button">) {
  const [isOpen, toggle, setToggle] = useToggle(false);
  const { animatedElementRef, shouldRender } =
    useAnimatedUnmount<HTMLDivElement>(isOpen);

  useClickOutside(animatedElementRef, () => {
    if (animatedElementRef.current) {
      setToggle(false);
    }
  });

  useEffect(() => {
    function listener({ detail }: Partial<CustomEvent>) {
      if (detail.success) {
        setToggle(false);
      }
    }

    seasonActionsEventManager.on(SEASON_ACTIONS_EVENT_KEY.CREATE, listener);

    return () => {
      seasonActionsEventManager.removeListener(
        SEASON_ACTIONS_EVENT_KEY.CREATE,
        listener
      );
    };
  }, [setToggle]);

  return (
    <>
      <button className="btn-primary mr-auto" onClick={toggle}>
        Iniciar nova temporada
      </button>
      <ConditionalRender condition={shouldRender}>
        <Dialog.Root>
          <Dialog.Container
            ref={animatedElementRef}
            className={twMerge([
              isOpen && "animate-inUp lg:animate-appearsFromLeft",
              !isOpen && "animate-outDown lg:animate-outRight",
              "bg-zinc-800 relative"
            ])}
          >
            <Dialog.Header className="justify-end bg-zinc-800 sticky top-0">
              <Dialog.CloseButton
                onClick={toggle}
                className="btn-light my-0 border-none"
              >
                X
              </Dialog.CloseButton>
            </Dialog.Header>
            <Dialog.Content className="items-start overflow-auto scrollbar-none">
              {children}
            </Dialog.Content>
          </Dialog.Container>
        </Dialog.Root>
      </ConditionalRender>
    </>
  );
}
