import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useLessonResult } from './index';
import { fetchLessonResult } from '@/services/fetchLessonResult';

jest.mock('@/services/fetchLessonResult');
const mockFetchLessonResult = fetchLessonResult as jest.MockedFunction<typeof fetchLessonResult>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const mockResult = {
  lessonId: 'lesson-1',
  totalDevices: 1,
  deviceResults: [],
  totalPoints: 0,
  duration: 60,
};

describe('useLessonResult', () => {
  afterEach(() => jest.clearAllMocks());

  it('does not call service when enabled=false', () => {
    mockFetchLessonResult.mockResolvedValue(mockResult);
    renderHook(() => useLessonResult(false), { wrapper: createWrapper() });
    expect(mockFetchLessonResult).not.toHaveBeenCalled();
  });

  it('returns data on success when enabled=true', async () => {
    mockFetchLessonResult.mockResolvedValue(mockResult);
    const { result } = renderHook(() => useLessonResult(true), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockResult);
  });

  it('sets isError=true when service throws', async () => {
    mockFetchLessonResult.mockRejectedValue(new Error('fetch error'));
    const { result } = renderHook(() => useLessonResult(true), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
