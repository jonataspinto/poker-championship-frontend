const light = {
  title: "light",

  colors: {
    primary: "#C62E65",
    secondary: "#7159f1",

    background: "#F5F5F5",
    text: "#333",
  },
  shadows: ["0px 4px 4px hsla(0, 0%, 0%, 0.25)", "0px -4px 4px rgba(0,0,0,0.25)"],
  palette: {
    type: "light",
    primary: {
      main: "#2E3B80",
      dark: "#202a60",
      contrastText: "#fff",
    },
    error: {
      main: "#B80000",
    },
    secondary: {
      main: "#FD7700",
    },
    background: {
      paper: "#FCFCFC",
      default: "#FFF",
    },
    text: {
      disabled: "#8A8A8A",
      primary: "#323232",
      secondary: "#FAFAFA",
      tertiary: "#FD7700",
      dark: "#4B4B4B",
    },
    action: {
      disabledBackground: "rgba(0, 0, 0, 0.12)",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    graph: {
      simple: "#202a60",
      doughnut: {
        1: "#946122",
        2: "#A691C7",
        3: "#202a60",
        4: "#FD7700",
        5: "#4E2294",
        6: "#6E5E40",
      }
    }
  },
  margin: {
    small: "8px",
    regular: "16px",
    medium: "24px",
    large: "32px",
    huge: "48px",
  },
  typography: {
    htmlFontSize: "16px",
    fontFamily: "Roboto",
    fontSize: "10px",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Roboto",
      fontWeight: 600,
      fontSize: "20px",
      lineHeight: "26.82px",
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "18px",
      lineHeight: "24.38px",
      letterSpacing: "-0.01562em",
    },
    body1: {
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "22.5px",
      letterSpacing: "-0.01562em",
    },
    body2: {
      fontFamily: "Roboto",
      fontWeight: 300,
      fontSize: "16px",
      lineHeight: "20.07px",
      letterSpacing: "-0.01562em",
    },
    button: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "12px",
      lineHeight: 1.167,
      letterSpacing: "-0.01562em",
    },
  },
  shape: {
    borderRadius: "5px",
    padding: {
      small: "8px",
      regular: "16px",
      medium: "24px",
      large: "32px",
      huge: "48px",
    },
  },
};

export default light;
