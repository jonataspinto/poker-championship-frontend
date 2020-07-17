import React from 'react';
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import {GlobalStyles} from './styles/themes/global'
import usePersistedThemeState from './utils/usePersistedThemeState';
import light from './styles/themes/light';
import dark from './styles/themes/dark';

export default function App() {

  const [ theme, setTheme] = usePersistedThemeState('theme', light);

  const toggleTheme = ()=>{
    setTheme(theme.title === 'light' ? dark : light)
    console.log(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <Routes />
    </ThemeProvider>
  );
}
