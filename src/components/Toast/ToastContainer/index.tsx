"use client";

import { ToastMessage } from "../ToastMessage";
import { useToastContainer } from "./useToastContainer";

export function ToastContainer() {
  const { renderList, handleRemoveItem } = useToastContainer();

  return (
    <div className="fixed flex flex-col justify-end gap-3 bottom-[48px] left-[50%] z-[200] transform -translate-[50%]">
      {/* TODO: Fix type error */}
      {/* @ts-expect-error: description in todo */}
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </div>
  );
}
