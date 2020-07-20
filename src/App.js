import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { GlobalStyles } from "./styles/themes/global";
import { store, persistor } from "./store";
import Routes from "./routes";
// import usePersistedThemeState from "./utils/usePersistedThemeState";
import light from "./styles/themes/light";
// import dark from "./styles/themes/dark";

export default function App() {
  // const [theme, setTheme] = usePersistedThemeState("theme", light);

  // console.log(theme);
  // const toggleTheme = () => {
  //   setTheme(theme.title === "light" ? dark : light);
  //   console.log(theme);
  // };

  return (
    <Provider store={store || {}}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <MuiThemeProvider> */}
        <ThemeProvider theme={light}>
          <GlobalStyles />
          <Routes />
        </ThemeProvider>
        {/* </MuiThemeProvider> */}
      </PersistGate>
    </Provider>
  );
}
