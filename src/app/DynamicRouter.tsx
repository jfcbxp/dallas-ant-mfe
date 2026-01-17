import React, { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./login/page'));

interface DynamicRouterProps {
	page: 'login' | 'orders' | 'orderDetails';
}

export default function DynamicRouter({ page }: Readonly<DynamicRouterProps>) {
	const renderPage = () => {
		switch (page) {
			case 'login':
				return <LoginPage />;
			case 'orders':
				return <LoginPage />;
			default:
				return <p>Página não encontrada</p>;
		}
	};

	return <Suspense fallback={<p>Carregando...</p>}>{renderPage()}</Suspense>;
}
