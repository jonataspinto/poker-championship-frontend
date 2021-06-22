import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/themes/global";
import { store, persistor } from "./store";
import { Routes } from "./containers/routes";
import light from "./styles/themes/light";

export default function App() {
  return (
    <Provider store={store || {}}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
