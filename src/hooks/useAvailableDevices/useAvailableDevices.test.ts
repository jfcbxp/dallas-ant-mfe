import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useAvailableDevices } from './index';
import { fetchAvailableDevices } from '@/services/fetchAvailableDevices';

jest.mock('@/services/fetchAvailableDevices');
const mockFetchAvailableDevices = fetchAvailableDevices as jest.MockedFunction<typeof fetchAvailableDevices>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useAvailableDevices', () => {
  afterEach(() => jest.clearAllMocks());

  it('starts with isLoading=true', () => {
    mockFetchAvailableDevices.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useAvailableDevices(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns array of Device[] on success', async () => {
    const mockDevices = [{ deviceId: 1, heartRate: 75 }, { deviceId: 2, heartRate: 90 }];
    mockFetchAvailableDevices.mockResolvedValue(mockDevices);
    const { result } = renderHook(() => useAvailableDevices(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockDevices);
  });

  it('sets isError=true when service throws', async () => {
    mockFetchAvailableDevices.mockRejectedValue(new Error('fetch error'));
    const { result } = renderHook(() => useAvailableDevices(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
