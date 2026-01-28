'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '@/styles/global';
import theme from '@/styles/theme';
import { AuthProvider } from '../providers/AuthProvider';
import StyledComponentsRegistry from '../lib/registry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import PrimeProvider from '../providers/PrimeProvider';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primeicons/primeicons.css';

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClientRef = useRef<QueryClient | undefined>(undefined);
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}

	return (
		<html lang='en'>
			<body className={`${inter.variable}`}>
				<AuthProvider>
					<PrimeProvider>
						<StyledComponentsRegistry>
							<ThemeProvider theme={theme}>
								<GlobalStyle />
								<QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>
							</ThemeProvider>
						</StyledComponentsRegistry>
					</PrimeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
