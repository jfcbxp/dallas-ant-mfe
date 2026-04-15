import { fetchPulseiras } from './index';
import { HeartRateData } from '@/types/heartRate';

const mockResponse = (body: unknown, status: number) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('fetchPulseiras', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('returns HeartRateData[] on 200 response', async () => {
    const data: HeartRateData[] = [
      {
        deviceId: 1,
        heartRate: 75,
        beatTime: 1000,
        beatCount: 10,
        manufacturerId: null,
        serialNumber: null,
        stickId: 1,
        receivedAt: '2024-01-01T00:00:00Z',
      },
    ];
    mockFetch.mockResolvedValueOnce(mockResponse(data, 200));

    const result = await fetchPulseiras();
    expect(result).toEqual(data);
  });

  it('returns empty array on non-2xx response (current service behavior)', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse('Service Unavailable', 503));

    const result = await fetchPulseiras();
    expect(result).toEqual([]);
  });
});
