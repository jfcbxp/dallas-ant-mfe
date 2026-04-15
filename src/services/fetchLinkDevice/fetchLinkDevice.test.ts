import { fetchLinkDevice } from './index';
import { LinkDeviceResponse } from '@/types/user';

const mockResponse = (body: unknown, status: number) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('fetchLinkDevice', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('returns LinkDeviceResponse on 200 response', async () => {
    const response: LinkDeviceResponse = {
      success: true,
      message: 'Device linked',
      deviceId: 42,
      userId: 'user-1',
    };
    mockFetch.mockResolvedValueOnce(mockResponse(response, 200));

    const result = await fetchLinkDevice(42, 'user-1');
    expect(result).toEqual(response);
  });

  it('throws Error on non-2xx response', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Device not found' }, 404));

    await expect(fetchLinkDevice(99, 'user-1')).rejects.toThrow(Error);
  });
});
