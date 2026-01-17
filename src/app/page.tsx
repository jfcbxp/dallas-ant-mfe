import React, { Suspense } from 'react';
import DynamicRouter from './DynamicRouter';

export default function MainApp() {
	const currentPage = 'login';

	return (
		<Suspense fallback={<p>Carregando...</p>}>
			<DynamicRouter page={currentPage} />
		</Suspense>
	);
}
