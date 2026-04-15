import { HeartRateData } from '@/types/heartRate';

export const fetchPulseiras = async (): Promise<HeartRateData[]> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/pulseiras`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error: unknown) {
		console.warn('API indisponível, usando mock:', (error as Error).message);
		return [];
	}
};
