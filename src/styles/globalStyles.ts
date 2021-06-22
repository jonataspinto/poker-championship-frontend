import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  body {
    background-color: ${(props) => props.theme.palette.background.paper};
  }

  html {
    scroll-behavior: smooth;
    color: ${(props) => props.theme.palette.text.primary};
    font-family: ${(props) => props.theme.typography.body1?.fontFamily};
    font-size: ${(props) => props.theme.typography.body1?.fontSize};
  }

  html, body, #root, #__next {
    height: 100%;
    width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    &:focus,
    &:active {
      text-decoration: none;
    }
  }

`;
