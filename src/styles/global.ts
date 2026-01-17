import { createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		fonts: {
			main: string;
		};
		colors: {
			primary: string;
			secondary: string;
			background: string;
			text: string;
			textLight: string;
			textWhite: string;
			success: string;
			info: string;
			infoText: string;
			inputBorder: string;
			placeholder: string;
			logoText: string;
			headerBackground: string;
			iconColor: string;
		};
		spacing: {
			small: string;
			medium: string;
			large: string;
			xlarge: string;
		};
		borderRadius: {
			small: string;
			medium: string;
			large: string;
		};
	}
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.main};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  button {
    border: none;
  }


`;

export default GlobalStyle;
