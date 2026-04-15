import { fetchUsersList } from './index';
import { User } from '@/types/user';

const mockResponse = (body: unknown, status: number) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('fetchUsersList', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('returns User[] on 200 response', async () => {
    const users: User[] = [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' },
    ];
    mockFetch.mockResolvedValueOnce(mockResponse(users, 200));

    const result = await fetchUsersList();
    expect(result).toEqual(users);
  });

  it('throws Error on non-2xx response', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Unauthorized' }, 401));

    await expect(fetchUsersList()).rejects.toThrow(Error);
  });
});
