import React from "react";
import { ThemeProvider } from "styled-components";
import { SnackbarProvider } from 'notistack';
import { Routes } from "./containers/routes";
import { GlobalStyles, Theme } from "./styles";
import { ModalProvider, NotificationProvider } from "./contexts"

export default function App() {
  return (
    <ThemeProvider theme={Theme }>
      <GlobalStyles />
      <SnackbarProvider maxSnack={6} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <NotificationProvider>
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </NotificationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
