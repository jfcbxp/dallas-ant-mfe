import React, { lazy, Suspense } from 'react';
import LinkDevicePage from './device/page';
import RegisterPage from './register/page';

const DashboardPage = lazy(() => import('./dashboard/page'));

interface DynamicRouterProps {
	page: 'register' | 'device' | 'dashboard';
}

export default function DynamicRouter({ page }: Readonly<DynamicRouterProps>) {
	const renderPage = () => {
		switch (page) {
			case 'register':
				return <RegisterPage />;
			case 'dashboard':
				return <DashboardPage />;
			case 'device':
				return <LinkDevicePage />;
			default:
				return <p>Página não encontrada</p>;
		}
	};

	return <Suspense fallback={<p>Carregando...</p>}>{renderPage()}</Suspense>;
}
