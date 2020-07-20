import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }

  html, body, #root {
    height: 100%;
  }

  body{
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: sans-serif;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};

    &:focus,
    &:active {
      text-decoration: none;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    /* width: 10px; */
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* background: #f1f1f1; */
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    /* background: #1c957e; */
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    /* background: #0f6858; */
  }
`;
