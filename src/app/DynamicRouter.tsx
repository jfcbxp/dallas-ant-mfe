import React, { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./login/page'));
const DashboardPage = lazy(() => import('./dashboard/page'));

interface DynamicRouterProps {
	page: 'login' | 'dashboard';
}

export default function DynamicRouter({ page }: Readonly<DynamicRouterProps>) {
	const renderPage = () => {
		switch (page) {
			case 'login':
				return <LoginPage />;
			case 'dashboard':
				return <DashboardPage />;
			default:
				return <p>Página não encontrada</p>;
		}
	};

	return <Suspense fallback={<p>Carregando...</p>}>{renderPage()}</Suspense>;
}
