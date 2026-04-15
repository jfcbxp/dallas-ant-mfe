import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useRegister } from './index';
import { fetchRegister } from '@/services/fetchRegister';

jest.mock('@/services/fetchRegister');
const mockFetchRegister = fetchRegister as jest.MockedFunction<typeof fetchRegister>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const validRegisterData = {
  name: 'John Doe',
  height: 175,
  weight: 70,
  birthDate: '1990-01-01',
  gender: 'M',
};

describe('useRegister', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls fetchRegister with valid RegisterData', async () => {
    mockFetchRegister.mockResolvedValue({ id: 'u1', name: 'John Doe', email: 'john@example.com' });
    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });
    await act(async () => {
      result.current.mutate(validRegisterData);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(mockFetchRegister).toHaveBeenCalledWith(validRegisterData);
  });

  it('sets isError=true when mutation throws', async () => {
    mockFetchRegister.mockRejectedValue(new Error('register error'));
    const { result } = renderHook(() => useRegister(), { wrapper: createWrapper() });
    await act(async () => {
      result.current.mutate(validRegisterData);
    });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
