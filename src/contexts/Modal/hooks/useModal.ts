import { useContext } from "react";
import { ModalContext } from "../modalContext";

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
}
