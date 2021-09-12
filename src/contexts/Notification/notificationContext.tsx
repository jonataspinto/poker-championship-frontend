import React, { createContext, useCallback } from "react";
import { INotification } from "../../interfaces";
import { INotificationContext } from "./interfaces";
import { useSnackbar } from 'notistack';

export const NotificationContext = createContext<INotificationContext>({} as INotificationContext);

export const NotificationProvider = ({ children }: INotificationContext.Provider) => {

  const { enqueueSnackbar } = useSnackbar();

  const notify = useCallback((notification: INotification) => {
    enqueueSnackbar(notification.content, { variant: notification.type });
  }, [
    enqueueSnackbar
  ]);

  return (
    <NotificationContext.Provider
      value={{
        notify
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
