import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useLessonStatus } from './index';
import { fetchLessonStatus } from '@/services/fetchLessonStatus';

jest.mock('@/services/fetchLessonStatus');
const mockFetchLessonStatus = fetchLessonStatus as jest.MockedFunction<typeof fetchLessonStatus>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useLessonStatus', () => {
  afterEach(() => jest.clearAllMocks());

  it('starts with isLoading=true', () => {
    mockFetchLessonStatus.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useLessonStatus(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns lesson status data on success', async () => {
    const mockData = { lessonId: '1', status: 'ACTIVE' as const, startedAt: '2024-01-01', duration: 60 };
    mockFetchLessonStatus.mockResolvedValue(mockData);
    const { result } = renderHook(() => useLessonStatus(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('sets isError=true when service throws', async () => {
    mockFetchLessonStatus.mockRejectedValue(new Error('fetch error'));
    const { result } = renderHook(() => useLessonStatus(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
