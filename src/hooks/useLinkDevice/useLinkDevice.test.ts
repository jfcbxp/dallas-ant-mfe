import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useLinkDevice } from './index';
import { fetchLinkDevice } from '@/services/fetchLinkDevice';

jest.mock('@/services/fetchLinkDevice');
const mockFetchLinkDevice = fetchLinkDevice as jest.MockedFunction<typeof fetchLinkDevice>;

const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
	});
	return ({ children }: { children: React.ReactNode }) => React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useLinkDevice', () => {
	afterEach(() => jest.clearAllMocks());

	it('calls fetchLinkDevice with correct arguments', async () => {
		mockFetchLinkDevice.mockResolvedValue({ success: true });
		const { result } = renderHook(() => useLinkDevice(), { wrapper: createWrapper() });
		await act(async () => {
			result.current.mutate({ deviceId: 1, userId: 'user-1' });
		});
		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockFetchLinkDevice).toHaveBeenCalledWith(1, 'user-1');
	});

	it('sets isError=true when mutation throws', async () => {
		mockFetchLinkDevice.mockRejectedValue(new Error('link error'));
		const { result } = renderHook(() => useLinkDevice(), { wrapper: createWrapper() });
		await act(async () => {
			result.current.mutate({ deviceId: 1, userId: 'user-1' });
		});
		await waitFor(() => expect(result.current.isError).toBe(true));
	});
});
