import { HeartRateData } from '@/types/heartRate';

const mockData: HeartRateData[] = [
	{
		deviceId: 1,
		heartRate: 126,
		beatTime: 1024,
		beatCount: 150,
		manufacturerId: 1,
		serialNumber: 12345,
		stickId: 1,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 2,
		heartRate: 158,
		beatTime: 1024,
		beatCount: 200,
		manufacturerId: 1,
		serialNumber: 12346,
		stickId: 2,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 3,
		heartRate: 103,
		beatTime: 1024,
		beatCount: 130,
		manufacturerId: 1,
		serialNumber: 12347,
		stickId: 3,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 4,
		heartRate: 174,
		beatTime: 1024,
		beatCount: 220,
		manufacturerId: 1,
		serialNumber: 12348,
		stickId: 5,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 5,
		heartRate: 149,
		beatTime: 1024,
		beatCount: 190,
		manufacturerId: 1,
		serialNumber: 12349,
		stickId: 1,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 6,
		heartRate: 96,
		beatTime: 1024,
		beatCount: 120,
		manufacturerId: 1,
		serialNumber: 12350,
		stickId: 3,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 7,
		heartRate: 135,
		beatTime: 1024,
		beatCount: 170,
		manufacturerId: 1,
		serialNumber: 12351,
		stickId: 3,
		receivedAt: new Date().toISOString(),
	},
	{
		deviceId: 8,
		heartRate: 160,
		beatTime: 1024,
		beatCount: 205,
		manufacturerId: 1,
		serialNumber: 12352,
		stickId: 3,
		receivedAt: new Date().toISOString(),
	},
];

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
	} catch (error: any) {
		console.warn('API indisponível, usando mock:', error.message);
		return mockData.map((item) => ({
			...item,
			heartRate: Math.max(60, Math.min(200, item.heartRate + Math.floor(Math.random() * 10 - 5))),
			receivedAt: new Date().toISOString(),
		}));
	}
};
