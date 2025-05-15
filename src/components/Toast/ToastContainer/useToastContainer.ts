import { useEffect } from "react";
import { toastEventManager } from "..";
import { useAnimatedList } from "./useAnimatedList";

export function useToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({
      detail: { type, text, duration }
    }: Partial<CustomEvent>) {
      setMessages((prevState: ToastItem[]) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration
        }
      ]);
    }

    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, [setMessages]);

  return {
    handleRemoveItem,
    renderList
  };
}
