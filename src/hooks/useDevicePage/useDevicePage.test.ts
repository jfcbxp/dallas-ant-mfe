import { renderHook, act } from '@testing-library/react';
import { useDevicePage } from './index';

jest.mock('@/hooks/useAvailableDevices');
jest.mock('@/hooks/useUsersList');
jest.mock('@/hooks/useLinkDevice');
jest.mock('@/hooks/useLessonStatus');
jest.mock('@/services/startLesson');
jest.mock('@/services/endLesson');

import { useAvailableDevices } from '@/hooks/useAvailableDevices';
import { useUsersList } from '@/hooks/useUsersList';
import { useLinkDevice } from '@/hooks/useLinkDevice';
import { useLessonStatus } from '@/hooks/useLessonStatus';

const mockMutate = jest.fn();

const setupMocks = () => {
	(useAvailableDevices as jest.Mock).mockReturnValue({
		data: [{ deviceId: 1 }, { deviceId: 2 }],
		isLoading: false,
	});
	(useUsersList as jest.Mock).mockReturnValue({
		data: [{ id: 'u1', name: 'Alice', email: 'alice@example.com' }],
		isLoading: false,
	});
	(useLinkDevice as jest.Mock).mockReturnValue({
		mutate: mockMutate,
		isPending: false,
		isError: false,
		error: null,
		isSuccess: false,
	});
	(useLessonStatus as jest.Mock).mockReturnValue({ data: undefined });
};

describe('useDevicePage', () => {
	beforeEach(() => {
		setupMocks();
		mockMutate.mockClear();
	});

	it('has correct initial state', () => {
		const { result } = renderHook(() => useDevicePage());
		expect(result.current.selectedDeviceId).toBeNull();
		expect(result.current.isModalOpen).toBe(false);
		expect(result.current.selectedUserId).toBe('');
		expect(result.current.isStarting).toBe(false);
		expect(result.current.isEnding).toBe(false);
	});

	it('handleSelectDevice opens modal and sets selectedDeviceId', () => {
		const { result } = renderHook(() => useDevicePage());
		act(() => {
			result.current.handleSelectDevice(1);
		});
		expect(result.current.selectedDeviceId).toBe(1);
		expect(result.current.isModalOpen).toBe(true);
	});

	it('handleCloseModal closes modal', () => {
		const { result } = renderHook(() => useDevicePage());
		act(() => {
			result.current.handleSelectDevice(1);
		});
		expect(result.current.isModalOpen).toBe(true);
		act(() => {
			result.current.handleCloseModal();
		});
		expect(result.current.isModalOpen).toBe(false);
	});
});
