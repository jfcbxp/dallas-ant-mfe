import { fetchLessonResult } from './index';
import { LessonResult } from '@/types/lessonResult';

const mockResponse = (body: unknown, status: number) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('fetchLessonResult', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('returns LessonResult on 200 response', async () => {
    const result: LessonResult = {
      lessonId: 'lesson-1',
      totalDevices: 2,
      deviceResults: [],
      totalPoints: 100,
      duration: 3600,
    };
    mockFetch.mockResolvedValueOnce(mockResponse(result, 200));

    const data = await fetchLessonResult();
    expect(data).toEqual(result);
  });

  it('throws Error on non-2xx response', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse('Internal Server Error', 500));

    await expect(fetchLessonResult()).rejects.toThrow(Error);
  });
});
