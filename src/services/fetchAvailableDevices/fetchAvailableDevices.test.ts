import { fetchAvailableDevices } from './index';
import { Device } from '@/types/device';

const mockResponse = (body: unknown, status: number) => ({
	ok: status >= 200 && status < 300,
	status,
	json: () => Promise.resolve(body),
});

describe('fetchAvailableDevices', () => {
	const mockFetch = jest.fn();

	beforeEach(() => {
		global.fetch = mockFetch;
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	it('returns Device[] on 200 response', async () => {
		const devices: Device[] = [
			{ deviceId: 1, heartRate: 80 },
			{ deviceId: 2, heartRate: 90 },
		];
		mockFetch.mockResolvedValueOnce(mockResponse(devices, 200));

		const result = await fetchAvailableDevices();
		expect(result).toEqual(devices);
	});

	it('throws Error on 404 response', async () => {
		mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Not found' }, 404));

		await expect(fetchAvailableDevices()).rejects.toThrow(Error);
	});

	it('throws Error on 500 response', async () => {
		mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Server error' }, 500));

		await expect(fetchAvailableDevices()).rejects.toThrow(Error);
	});
});
