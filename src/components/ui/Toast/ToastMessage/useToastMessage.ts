import { useEffect } from "react";

export function useToastMessage(
  message: ToastItem,
  onRemoveMessage: (id: number) => void
) {
  const handleRemoveToast = () => {
    onRemoveMessage(message.id);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message]);

  return {
    handleRemoveToast
  };
}
