import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { store, persistor } from "./store";
import { Routes } from "./containers/routes";
import { GlobalStyles, Theme } from "./styles";
import { ModalProvider } from "./contexts"

export default function App() {
  return (
    <Provider store={store || {}}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={Theme }>
          <GlobalStyles />
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
