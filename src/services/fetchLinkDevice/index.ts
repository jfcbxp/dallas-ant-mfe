export interface LinkDeviceResponse {
	success: boolean;
	message?: string;
	deviceId?: number;
	userId?: string;
}

export const fetchLinkDevice = async (deviceId: number, userId: string): Promise<LinkDeviceResponse> => {
	try {
		const url = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/devices/link`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ deviceId, userId }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error?.error || `Request failed with status [${response.status}]`);
		}

		const result = await response.json();
		return result;
	} catch (error: any) {
		throw new Error(error.message || 'Failed to link device');
	}
};
