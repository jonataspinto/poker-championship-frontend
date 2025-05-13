"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useAnimatedUnmount, useToggle, useClickOutside } from "@/hooks";
import { ConditionalRender, Dialog } from "@/components";
import {
  JOURNEY_ACTIONS_EVENT_KEY,
  journeyActionsEventManager
} from "../journeyActionsEventManager";

export function JourneyPodiumDialog({
  children
}: {
  children?: React.ReactNode;
}) {
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

    journeyActionsEventManager.on(JOURNEY_ACTIONS_EVENT_KEY.UPDATE, listener);

    return () => {
      journeyActionsEventManager.removeListener(
        JOURNEY_ACTIONS_EVENT_KEY.UPDATE,
        listener
      );
    };
  }, [setToggle]);

  return (
    <>
      <button onClick={toggle} className="btn-primary">
        Atribuir pontuação
      </button>
      <ConditionalRender condition={shouldRender}>
        <Dialog.Root>
          <Dialog.Container
            ref={animatedElementRef}
            className={twMerge([
              isOpen && "animate-inUp lg:animate-appearsFromLeft",
              !isOpen && "animate-outDown lg:animate-outRight",
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
            <Dialog.Content className="items-start overflow-y-auto scrollbar-none">
              {children}
            </Dialog.Content>
          </Dialog.Container>
        </Dialog.Root>
      </ConditionalRender>
    </>
  );
}
