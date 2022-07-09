import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors['green-500']};
  }

  body {
    background: ${({ theme }) => theme.colors['gray-900']};
    color: ${({ theme }) => theme.colors['gray-300']};
  }

  body, input, button, textarea {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }
`
