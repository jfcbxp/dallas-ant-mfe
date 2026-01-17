import React from 'react';
import { PrimeReactProvider } from 'primereact/api';

interface LayoutProps {
	children: React.ReactNode;
}

export default function PrimeProvider({ children }: Readonly<LayoutProps>) {
	return <PrimeReactProvider>{children}</PrimeReactProvider>;
}
