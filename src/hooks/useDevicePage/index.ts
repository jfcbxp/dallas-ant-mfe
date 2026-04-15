'use client';

import { useState, useEffect } from 'react';
import { useAvailableDevices } from '@/hooks/useAvailableDevices';
import { useUsersList } from '@/hooks/useUsersList';
import { useLinkDevice } from '@/hooks/useLinkDevice';
import { useLessonStatus } from '@/hooks/useLessonStatus';
import { startLesson } from '@/services/startLesson';
import { endLesson } from '@/services/endLesson';
import { Device } from '@/types/device';
import { User } from '@/types/user';
import { LessonStatus } from '@/types/lesson';

export interface UseDevicePageReturn {
	devices: Device[];
	users: User[];
	lessonStatus: LessonStatus | undefined;
	selectedDevice: Device | undefined;
	selectedDeviceId: number | null;
	selectedUserId: string;
	isStarting: boolean;
	isEnding: boolean;
	isModalOpen: boolean;
	isLoading: boolean;
	isLinking: boolean;
	isError: boolean;
	isSuccess: boolean;
	error: Error | null;
	canLinkDevice: boolean;
	handleSelectDevice: (deviceId: number) => void;
	handleLinkDevice: () => void;
	handleStartLesson: () => Promise<void>;
	handleEndLesson: () => Promise<void>;
	handleCloseModal: () => void;
	setSelectedUserId: (userId: string) => void;
}

export const useDevicePage = (): UseDevicePageReturn => {
	const { data: devices = [], isLoading: devicesLoading } = useAvailableDevices();
	const { data: users = [], isLoading: usersLoading } = useUsersList();
	const { mutate: linkDevice, isPending: isLinking, isError, error: linkError, isSuccess } = useLinkDevice();
	const { data: lessonStatus } = useLessonStatus();

	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
	const [selectedUserId, setSelectedUserId] = useState<string>('');
	const [isStarting, setIsStarting] = useState(false);
	const [isEnding, setIsEnding] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (isSuccess) {
			setSelectedDeviceId(null);
			setSelectedUserId('');
			setIsModalOpen(false);
		}
	}, [isSuccess]);

	const handleSelectDevice = (deviceId: number) => {
		setSelectedDeviceId(deviceId);
		setIsModalOpen(true);
	};

	const handleLinkDevice = () => {
		if (selectedDeviceId !== null && selectedUserId) {
			linkDevice({ deviceId: selectedDeviceId, userId: selectedUserId });
		}
	};

	const handleStartLesson = async () => {
		setIsStarting(true);
		setError(null);
		try {
			await startLesson();
		} catch (err) {
			setError(err instanceof Error ? err : new Error(String(err)));
		} finally {
			setIsStarting(false);
		}
	};

	const handleEndLesson = async () => {
		setIsEnding(true);
		setError(null);
		try {
			await endLesson();
		} catch (err) {
			setError(err instanceof Error ? err : new Error(String(err)));
		} finally {
			setIsEnding(false);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const selectedDevice = devices.find((d) => d.deviceId === selectedDeviceId);
	const isLoading = devicesLoading || usersLoading;
	const canLinkDevice = selectedDeviceId !== null && selectedUserId !== '';

	return {
		devices,
		users,
		lessonStatus,
		selectedDevice,
		selectedDeviceId,
		selectedUserId,
		isStarting,
		isEnding,
		isModalOpen,
		isLoading,
		isLinking,
		isError,
		isSuccess,
		error: error ?? linkError ?? null,
		canLinkDevice,
		handleSelectDevice,
		handleLinkDevice,
		handleStartLesson,
		handleEndLesson,
		handleCloseModal,
		setSelectedUserId,
	};
};
