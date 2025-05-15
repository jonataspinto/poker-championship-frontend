"use client";

import { memo } from "react";
import { twMerge } from "tailwind-merge";

// import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
// import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { useToastMessage } from "./useToastMessage";
import "./styles.css";

type Props = {
  message: ToastItem;
  onRemoveMessage: (id: number) => void;
  isLeaving: boolean;
  animatedRef: React.RefObject<HTMLDivElement>;
};

function Component({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef
}: Props) {
  const { handleRemoveToast } = useToastMessage(message, onRemoveMessage);

  return (
    <div
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      ref={animatedRef}
      className={twMerge([
        "flex items-center justify-center rounded-sm",
        "py-4 px-8 shadow-[0,20px,20px,-16px,rgba(0,0,0,0.25)]",
        "text-white cursor-pointer toast-message-in",
        isLeaving && ["toast-message-out"],
        message.type === "default" && ["bg-gray-800"],
        message.type === "success" && ["bg-green-600"],
        message.type === "danger" && ["bg-red-600"]
      ])}
    >
      {/* {message.type === 'danger' && <img src={xCircleIcon} alt="x" />} */}
      {/* {message.type === 'success' && <img src={checkCircleIcon} alt="x" />} */}
      <strong>{message.text}</strong>
    </div>
  );
}

export const ToastMessage = memo(Component);
