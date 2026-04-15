import { fetchRegister } from './index';
import { RegisterData, RegisterResponse } from '@/types/user';

const mockResponse = (body: unknown, status: number) => ({
	ok: status >= 200 && status < 300,
	status,
	json: () => Promise.resolve(body),
});

describe('fetchRegister', () => {
	const mockFetch = jest.fn();

	const registerData: RegisterData = {
		name: 'Alice',
		height: 170,
		weight: 65,
		birthDate: '1990-01-01',
		gender: 'F',
	};

	beforeEach(() => {
		global.fetch = mockFetch;
	});

	afterEach(() => {
		mockFetch.mockReset();
	});

	it('returns RegisterResponse on 200 response', async () => {
		const response: RegisterResponse = {
			id: 'new-user-id',
			name: 'Alice',
			email: 'alice@example.com',
		};
		mockFetch.mockResolvedValueOnce(mockResponse(response, 200));

		const result = await fetchRegister(registerData);
		expect(result).toEqual(response);
	});

	it('throws Error on non-2xx response', async () => {
		mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Conflict' }, 409));

		await expect(fetchRegister(registerData)).rejects.toThrow(Error);
	});
});
