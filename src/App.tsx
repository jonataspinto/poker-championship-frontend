import React from "react";
import { ThemeProvider } from "styled-components";
import { Routes } from "./containers/routes";
import { GlobalStyles, Theme } from "./styles";
import { ModalProvider } from "./contexts"

export default function App() {
  return (
    <ThemeProvider theme={Theme }>
      <GlobalStyles />
      <ModalProvider>
        <Routes />
      </ModalProvider>
    </ThemeProvider>
  );
}
