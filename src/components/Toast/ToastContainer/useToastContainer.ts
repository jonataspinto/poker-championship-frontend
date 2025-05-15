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
    }: Partial<CustomEvent> & {
      detail: {
        type: "default" | "success" | "error";
        text: string;
        duration?: number;
      };
    }) {
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
    //@ts-expect-error: description in todo
    // TODO: Fix type error
    toastEventManager.on("addtoast", handleAddToast);

    return () => {
      //@ts-expect-error: description in todo
      // TODO: Fix type error
      toastEventManager.removeListener("addtoast", handleAddToast);
    };
  }, [setMessages]);

  return {
    handleRemoveItem,
    renderList
  };
}
