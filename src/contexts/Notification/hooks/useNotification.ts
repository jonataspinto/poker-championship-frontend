import { useContext } from "react";
import { NotificationContext } from "../notificationContext";

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within an NotificationProvider");
  }

  const state = context

  return {
    ...state
  };
}
