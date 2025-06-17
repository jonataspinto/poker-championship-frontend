"use client";

import { ToastMessage } from "../ToastMessage";
import { useToastContainer } from "./useToastContainer";

export function ToastContainer() {
  const { renderList, handleRemoveItem } = useToastContainer();

  return (
    <div className="fixed flex flex-col gap-3 top-[48px] left-[50%] z-[200] transform -translate-x-[50%]">
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
