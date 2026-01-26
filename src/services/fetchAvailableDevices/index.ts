export interface Device {
	deviceId: number;
	heartRate?: number;
	beatTime?: number;
	beatCount?: number;
	manufacturerId?: number | null;
	serialNumber?: number | null;
	stickId?: number;
	receivedAt?: string;
}

export const fetchAvailableDevices = async (): Promise<Device[]> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/devices/available`;

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error?.error || `Request failed with status [${response.status}]`);
		}

		const result = await response.json();
		return Array.isArray(result) ? result : result.data || [];
	} catch (error: any) {
		throw new Error(error.message || 'Failed to fetch devices');
	}
};
