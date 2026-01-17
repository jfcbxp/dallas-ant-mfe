import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Meu Portal Rommanel PA',
		short_name: 'RommanelPA',
		description: 'Meu Portal Rommanel PA',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/favicon.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
