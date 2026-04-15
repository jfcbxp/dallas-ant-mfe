import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { usePulseiras } from './index';
import { fetchPulseiras } from '@/services/fetchPulseiras';

jest.mock('@/services/fetchPulseiras');
const mockFetchPulseiras = fetchPulseiras as jest.MockedFunction<typeof fetchPulseiras>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('usePulseiras', () => {
  afterEach(() => jest.clearAllMocks());

  it('starts with isLoading=true', () => {
    mockFetchPulseiras.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => usePulseiras(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns data on success', async () => {
    const mockData = [{ deviceId: 1, heartRate: 80, beatTime: 0, beatCount: 0, manufacturerId: null, serialNumber: null, stickId: 1, receivedAt: '2024-01-01' }];
    mockFetchPulseiras.mockResolvedValue(mockData);
    const { result } = renderHook(() => usePulseiras(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockData);
  });

  it('sets isError=true when service throws', async () => {
    mockFetchPulseiras.mockRejectedValue(new Error('fetch error'));
    const { result } = renderHook(() => usePulseiras(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
