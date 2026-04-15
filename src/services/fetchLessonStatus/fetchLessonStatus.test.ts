import { fetchLessonStatus } from './index';
import { LessonStatus } from '@/types/lesson';

const mockResponse = (body: unknown, status: number) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe('fetchLessonStatus', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  it('returns LessonStatus on 200 response', async () => {
    const status: LessonStatus = {
      lessonId: 'abc-123',
      status: 'ACTIVE',
      startedAt: '2024-01-01T00:00:00Z',
      duration: 60,
    };
    mockFetch.mockResolvedValueOnce(mockResponse(status, 200));

    const result = await fetchLessonStatus();
    expect(result).toEqual(status);
  });

  it('throws Error with descriptive message on non-2xx response', async () => {
    mockFetch.mockResolvedValueOnce(mockResponse({ error: 'Lesson not found' }, 404));

    await expect(fetchLessonStatus()).rejects.toThrow('Lesson not found');
  });
});
