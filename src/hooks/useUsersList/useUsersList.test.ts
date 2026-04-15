import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useUsersList } from './index';
import { fetchUsersList } from '@/services/fetchUsersList';

jest.mock('@/services/fetchUsersList');
const mockFetchUsersList = fetchUsersList as jest.MockedFunction<typeof fetchUsersList>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUsersList', () => {
  afterEach(() => jest.clearAllMocks());

  it('starts with isLoading=true', () => {
    mockFetchUsersList.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useUsersList(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('returns array of User[] on success', async () => {
    const mockUsers = [
      { id: 'u1', name: 'Alice', email: 'alice@example.com' },
      { id: 'u2', name: 'Bob', email: 'bob@example.com' },
    ];
    mockFetchUsersList.mockResolvedValue(mockUsers);
    const { result } = renderHook(() => useUsersList(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockUsers);
  });

  it('sets isError=true when service throws', async () => {
    mockFetchUsersList.mockRejectedValue(new Error('fetch error'));
    const { result } = renderHook(() => useUsersList(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
