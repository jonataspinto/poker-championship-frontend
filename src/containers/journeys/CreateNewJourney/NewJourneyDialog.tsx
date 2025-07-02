"use client";

import { twMerge } from "tailwind-merge";
import { ComponentProps, useEffect } from "react";
import { ConditionalRender, Dialog } from "@/components";
import { useAnimatedUnmount, useClickOutside, useToggle } from "@/hooks";
import {
  JOURNEY_ACTIONS_EVENT_KEY,
  journeyActionsEventManager
} from "../journeyActionsEventManager";

export function NewJourneyDialog({
  disabled,
  children
}: ComponentProps<"button">) {
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

    journeyActionsEventManager.on(JOURNEY_ACTIONS_EVENT_KEY.CREATE, listener);

    return () => {
      journeyActionsEventManager.removeListener(
        JOURNEY_ACTIONS_EVENT_KEY.CREATE,
        listener
      );
    };
  }, [setToggle]);

  return (
    <>
      <button
        className="btn-primary mr-auto"
        disabled={disabled}
        onClick={toggle}
      >
        Iniciar nova rodada
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
