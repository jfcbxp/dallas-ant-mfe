import { endLesson } from './index';

const mockResponse = (body: unknown, status: number) => ({
	ok: status >= 200 && status < 300,
	status,
	json: () => Promise.resolve(body),
	text: () => Promise.resolve(typeof body === 'string' ? body : JSON.stringify(body)),
});

describe('endLesson', () => {
	const mockFetch = jest.fn();

	beforeEach(() => {
		global.fetch = mockFetch;
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	it('resolves without error on 200 response', async () => {
		mockFetch.mockResolvedValueOnce(mockResponse(null, 200));

		await expect(endLesson()).resolves.toBeUndefined();
	});

	it('throws Error on non-2xx response', async () => {
		mockFetch.mockResolvedValueOnce(mockResponse(null, 500));

		await expect(endLesson()).rejects.toThrow(Error);
	});
});
