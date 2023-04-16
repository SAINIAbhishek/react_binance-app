import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`

  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #root,
  .app {
    height: 100%;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
`
