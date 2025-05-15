import { EventManager } from "@/utils/EventManager";

export const toastEventManager = new EventManager();

export function toast({
  type,
  text,
  duration
}: {
  type: "default" | "success" | "danger";
  text: string;
  duration?: number;
}) {
  toastEventManager.emit("addtoast", {
    detail: {
      type,
      text,
      duration
    }
  });
}
