import { ReactNode } from "react";
import { INotification } from "../../../interfaces";

export interface INotificationContext {
  notify: (content: INotification) => void;
}

export namespace INotificationContext {
  export type Provider = {
    children: ReactNode;
  }
}
